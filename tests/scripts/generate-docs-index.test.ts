import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test, { type TestContext } from "node:test";
import {
  descriptionFrom,
  main,
  renderIndex,
  syncIndex,
} from "../../scripts/generate-docs-index.ts";

function fixture(t: TestContext) {
  const root = mkdtempSync(join(tmpdir(), "docs-index-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const docs = join(root, "docs");
  mkdirSync(docs);
  const write = (path: string, content: string): string => {
    const target = join(docs, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, "utf8");
    return target;
  };
  return { docs, write };
}

test("indexes nested documents and directory README scopes deterministically", (t) => {
  const { docs, write } = fixture(t);
  write("GOAL.md", '---\ndescription: "Product goals"\n---\n');
  write("development/README.md", '---\ndescription: "Development area"\n---\n');
  write("development/deep/guide.md", '---\ndescription: "Work guide"\n---\n');
  write("development/AGENTS.md", "# Instructions\n");
  write("development/INDEX.tsv", "old\n");

  const expected =
    "path\tdescription\n" +
    "GOAL.md\tProduct goals\n" +
    "development/\tDevelopment area\n" +
    "development/deep/guide.md\tWork guide\n";
  assert.equal(renderIndex(docs, Number.POSITIVE_INFINITY), expected);
  assert.equal(renderIndex(docs, Number.POSITIVE_INFINITY), expected);
  assert.equal(
    renderIndex(docs),
    "path\tdescription\nGOAL.md\tProduct goals\ndevelopment/\tDevelopment area\n",
  );
});

test("normalizes folded multiline YAML and UTF-8 BOM", (t) => {
  const { write } = fixture(t);
  const path = write(
    "guides/test.md",
    "\uFEFF---\ndescription: >-\n  Choose when reviewing\n  a test result.\n---\n",
  );
  assert.equal(descriptionFrom(path), "Choose when reviewing a test result.");
});

test("fails closed on missing, malformed, and invalid frontmatter", (t) => {
  const { docs, write } = fixture(t);
  write("bad.md", "# No metadata\n");
  assert.throws(() => renderIndex(docs), /missing YAML frontmatter/);
  write("bad.md", "---\ndescription: [\n---\n");
  assert.throws(() => renderIndex(docs), /invalid YAML frontmatter/);
  write("bad.md", "---\ntitle: Nope\n---\n");
  assert.throws(() => renderIndex(docs), /string description/);
  write("bad.md", "---\ndescription: '   '\n---\n");
  assert.throws(() => renderIndex(docs), /empty frontmatter description/);
});

test("check mode detects drift without writing", (t) => {
  const { docs, write } = fixture(t);
  write("doc.md", '---\ndescription: "First"\n---\n');
  assert.equal(syncIndex(docs, false), "updated");
  const index = join(docs, "INDEX.tsv");
  const original = readFileSync(index, "utf8");
  assert.equal(syncIndex(docs, true), "current");
  write("doc.md", '---\ndescription: "Changed"\n---\n');
  assert.throws(() => syncIndex(docs, true), /missing or stale/);
  assert.equal(readFileSync(index, "utf8"), original);
  assert.equal(syncIndex(docs, false), "updated");
  assert.match(readFileSync(index, "utf8"), /Changed/);
});

test("invalid metadata never rewrites an existing index", (t) => {
  const { docs, write } = fixture(t);
  write("doc.md", '---\ndescription: "Valid"\n---\n');
  const index = write("INDEX.tsv", "existing\n");
  write("broken.md", "# no metadata\n");
  assert.throws(() => syncIndex(docs, false), /missing YAML frontmatter/);
  assert.equal(readFileSync(index, "utf8"), "existing\n");
});

test("does not invent directory entries without README", (t) => {
  const { docs, write } = fixture(t);
  write("reference/guide.md", '---\ndescription: "Some guide"\n---\n');
  const output = renderIndex(docs, Number.POSITIVE_INFINITY);
  assert.match(output, /reference\/guide.md\tSome guide/);
  assert.doesNotMatch(output, /reference\/\t/);
});

test("rejects symlinks instead of following them", (t) => {
  const { docs, write } = fixture(t);
  const source = write("doc.md", '---\ndescription: "Valid"\n---\n');
  symlinkSync(source, join(docs, "link.md"));
  assert.throws(() => renderIndex(docs), /symlinks are not indexed/);
});

test("shallow index stops at directory scopes", (t) => {
  const { docs, write } = fixture(t);
  write("one/README.md", '---\ndescription: "One area"\n---\n');
  write("one/two/README.md", '---\ndescription: "Two area"\n---\n');
  write("one/two/detail.md", '---\ndescription: "Detail"\n---\n');
  assert.equal(renderIndex(docs), "path\tdescription\none/\tOne area\n");
  assert.match(renderIndex(docs, 2), /one\/two\/\tTwo area/);
  assert.doesNotMatch(renderIndex(docs, 2), /detail.md/);
  assert.match(renderIndex(docs, Number.POSITIVE_INFINITY), /detail.md/);
});

test("TSV descriptions escape quotes", (t) => {
  const { docs, write } = fixture(t);
  write("quoted.md", '---\ndescription: "A \\"quoted\\" choice"\n---\n');
  assert.match(renderIndex(docs), /"A ""quoted"" choice"/);
});

test("check mode validates deeper metadata without expanding the shallow index", (t) => {
  const { docs, write } = fixture(t);
  write("area/README.md", '---\ndescription: "Area scope"\n---\n');
  write("area/bad.md", "# missing metadata\n");
  assert.equal(syncIndex(docs, false), "updated");
  const original = readFileSync(join(docs, "INDEX.tsv"), "utf8");
  assert.throws(() => syncIndex(docs, true), /missing YAML frontmatter/);
  assert.equal(readFileSync(join(docs, "INDEX.tsv"), "utf8"), original);
});

test("CLI uses a custom root and supports read-only checks", (t) => {
  const { docs, write } = fixture(t);
  write("doc.md", '---\ndescription: "One"\n---\n');
  assert.equal(main(["--root", docs, "--depth", "all"]), 0);
  const original = readFileSync(join(docs, "INDEX.tsv"), "utf8");
  assert.equal(main(["--root", docs, "--depth", "all", "--check"]), 0);
  assert.equal(readFileSync(join(docs, "INDEX.tsv"), "utf8"), original);
});

test("standalone frontmatter validation is read-only", (t) => {
  const { write } = fixture(t);
  const doc = write(
    "doc.md",
    '---\ndescription: "Select when checking metadata"\n---\n\n# Doc\n',
  );
  const before = readFileSync(doc, "utf8");
  assert.equal(main(["--validate", doc]), 0);
  assert.equal(readFileSync(doc, "utf8"), before);
});

test("standalone frontmatter validation rejects missing metadata or input", (t) => {
  const { write } = fixture(t);
  const doc = write("invalid.md", "# No metadata\n");
  assert.equal(main(["--validate", doc]), 1);
  assert.equal(main(["--validate"]), 2);
  assert.equal(main(["--validate", "--check"]), 2);
});

test("check mode validates root README without indexing it", (t) => {
  const { docs, write } = fixture(t);
  write(
    "README.md",
    '---\ndescription: "Docs entrypoint"\n---\n# Documentation\n',
  );
  write("area/README.md", '---\ndescription: "Area"\n---\n');
  assert.equal(syncIndex(docs, false), "updated");
  const index = join(docs, "INDEX.tsv");
  const original = readFileSync(index, "utf8");
  assert.doesNotMatch(original, /README\.md/);
  assert.equal(syncIndex(docs, true), "current");

  write("README.md", "# Missing frontmatter\n");
  assert.throws(() => syncIndex(docs, true), /missing YAML frontmatter/);
  assert.equal(readFileSync(index, "utf8"), original);
});

test("CLI --help and -h print concise usage to stdout and exit 0", (t) => {
  const logged: unknown[] = [];
  t.mock.method(console, "log", (...args: unknown[]) => {
    logged.push(args.join(" "));
  });
  assert.equal(main(["--help"]), 0);
  assert.equal(main(["-h"]), 0);
  assert.equal(logged.length, 2);
  assert.equal(logged[0], logged[1]);
  assert.match(String(logged[0]), /--validate FILE/);
  assert.match(String(logged[0]), /Read-only:/);
});
