#!/usr/bin/env node

import readline from "readline";
import minimist from "minimist";
import Database from "./database.js";
import MemoOperation from "./memo_operation.js";

const db = new Database("./memo.db");

function readInput() {
  const rl = readline.createInterface(process.stdin);
  const inputContents = [];

  return new Promise((resolve) => {
    rl.on("line", (line) => {
      inputContents.push(line);
    });

    rl.on("close", () => {
      resolve(inputContents.join("\n").trim());
    });
  });
}

async function main() {
  const args = minimist(process.argv.slice(2));
  await db.initializeDatabase();

  const memo = new MemoOperation(db);
  const noArgument = process.argv.length <= 2;
  const invalidArgument = !args.l && !args.r && !args.d && !noArgument;

  if (invalidArgument) {
    console.error("有効なオプションを指定してください");
    process.exitCode = 1;
  } else if (args.l) {
    await memo.list();
  } else if (args.r) {
    memo.show();
  } else if (args.d) {
    memo.delete();
  } else if (noArgument) {
    const input = await readInput();
    memo.add(input);
  }
}

main();
