#!/usr/bin/env node

import minimist from "minimist";
import fs from "fs";
import Database from "./database.js";
import MemoOperation from "./memo_operation.js";

const db = new Database("./memo.db");

async function main() {
  const args = minimist(process.argv.slice(2));
  await db.initializeDatabase();

  const memo = new MemoOperation(db);

  if (args.l) {
    await memo.add();
  } else if (args.r) {
    memo.show();
  } else if (args.d) {
    memo.delete();
  } else if (process.argv.length <= 2) {
    const input = fs.readFileSync(0, "utf8").trim();
    memo.add(input);
  } else {
    console.log("有効なオプションを指定してください");
  }
}

main();
