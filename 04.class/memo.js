#!/usr/bin/env node

import readline from "readline";
import minimist from "minimist";
import Database from "./database.js";
import MemoOperation from "./memo_operation.js";

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
  const db = new Database("./memo.db");
  const args = minimist(process.argv.slice(2));
  await db.initializeDatabase();

  const memoOperator = new MemoOperation(db);
  const noArgument = process.argv.length <= 2;
  const invalidArgument = !args.l && !args.r && !args.d && !noArgument;

  try {
    if (invalidArgument) {
      console.error("Please specify a valid option.");
      process.exitCode = 1;
    } else if (args.l) {
      await memoOperator.list();
    } else if (args.r) {
      await memoOperator.show();
    } else if (args.d) {
      await memoOperator.delete();
    } else if (noArgument) {
      const input = await readInput();
      await memoOperator.add(input);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Processing has been interrupted.: ${error.message}`);
      process.exitCode = 1;
    } else {
      console.error("Operation has been interrupted.");
      process.exitCode = 1;
    }
  }
}

main();
