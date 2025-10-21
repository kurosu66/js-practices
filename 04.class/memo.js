#!/usr/bin/env node

import minimist from "minimist";
import fs from "fs";
import sqlite3 from "sqlite3";
import MemoOperation from "./memo_operation.js";

const db = new sqlite3.Database("./memo.db");

async function initializeDatabase() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, memo TEXT NOT NULL)",
      () => resolve(),
    );
  });
}

async function main() {
  const args = minimist(process.argv.slice(2));
  const memo = new MemoOperation(db);

  await initializeDatabase();

  if (args.l) {
    memo.index();
  } else if (args.r) {
    memo.detail();
  } else if (args.d) {
    memo.delete();
  } else if (process.argv.length <= 2) {
    const input = fs.readFileSync(0, "utf8").trim();
    memo.post(input);
  } else {
    console.log("有効なオプションを指定してください");
  }
}

main();
