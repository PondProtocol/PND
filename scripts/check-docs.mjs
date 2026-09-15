#!/usr/bin/env node
// Validates that relative Markdown links resolve, and reports the TODO
// placeholders that docs/open-questions.md is supposed to track.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const skipDirs = new Set(["node_modules", ".git"]);
const linkPattern = /\[[^\]]*\]\(([^)\s]+)\)/g;

function markdownFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".github") continue;
    if (skipDirs.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

const files = markdownFiles(root).sort();
const broken = [];
const todos = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(root, file);

  for (const match of text.matchAll(linkPattern)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = resolve(dirname(file), target.split("#")[0]);
    if (!exists(path)) broken.push(`${rel} -> ${target}`);
  }

  text.split("\n").forEach((line, index) => {
    if (line.includes("TODO")) todos.push(`${rel}:${index + 1}`);
  });
}

console.log(`checked ${files.length} markdown files`);
console.log(`${todos.length} TODO placeholders (tracked in docs/open-questions.md)`);

if (broken.length > 0) {
  console.error(`\n${broken.length} broken relative link(s):`);
  for (const entry of broken) console.error(`  ${entry}`);
  process.exit(1);
}

console.log("no broken relative links");
