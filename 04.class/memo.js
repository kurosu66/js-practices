#!/usr/bin/env node

import readline from "readline";
import minimist from "minimist";
import MemoDatabase from "./memo_database.js";
import MemoOperation from "./memo_operation.js";

function readInput() {
  const rl = readline.createInterface(process.stdin);
  const lines = [];

  return new Promise((resolve) => {
    rl.on("line", (line) => {
      lines.push(line);
    });
    rl.on("close", () => {
      resolve(lines.join("\n"));
    });
  });
}

async function main() {
  const memoDb = new MemoDatabase("./memo.db");
  const args = minimist(process.argv.slice(2));
  await memoDb.initializeDatabase();

  const memoOperation = new MemoOperation(memoDb);
  const isNoArguments = process.argv.length <= 2;
  const isInvalidArgument = !(args.l || args.r || args.d || isNoArguments);

  try {
    if (isInvalidArgument) {
      console.error("Please specify a valid option.");
      process.exitCode = 1;
      return;
    } else if (args.l) {
      await memoOperation.list();
    } else if (args.r) {
      await memoOperation.show();
    } else if (args.d) {
      await memoOperation.delete();
    } else {
      const input = await readInput();
      await memoOperation.add(input);
    }
  } catch (error) {
    // enquirerのユーザー側のキャンセル（Ctrl+C）を想定
    if (error === "") {
      process.exitCode = 0;
    } else {
      throw error;
    }
  }
}

main();
