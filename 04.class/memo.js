import enquirer from "enquirer";
import minimist from "minimist";
import sqlite3 from "sqlite3";
import fs from "fs";

const db = new sqlite3.Database("./memo.db");
const { Select } = enquirer;

class Memo {
  main() {
    const args = minimist(process.argv.slice(2));

    if (args.l) {
      this.index();
    } else if (args.r) {
      this.detail();
    } else if (args.d) {
      this.deleteMemo();
    } else if (process.argv.length <= 2) {
      console.log(process.argv);
      db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, memo TEXT NOT NULL)",
      );
      const input = fs.readFileSync(0, "utf8").trim();
      this.post(input);
    } else {
      console.log("有効なオプションを指定してください");
    }
  }

  post(input) {
    db.run("INSERT INTO memos (memo) VALUES (?)", [input]);
  }

  index() {
    db.all("SELECT * FROM memos", (_err, rows) => {
      rows.forEach((row) => {
        console.log(row.memo.split("\n")[0]);
      });
    });
  }

  detail() {
    db.all("SELECT * FROM memos", async (_err, rows) => {
      const choices = rows.map((row) => ({
        name: String(row.id),
        message: row.memo.split("\n")[0],
        value: row.id,
      }));

      const prompt = new Select({
        name: "select",
        message: "Choose a note you want to see:",
        choices: choices,
      });

      const selectedId = await prompt.run();
      const selectedMemo = rows.find((row) => row.id === Number(selectedId));
      console.log(selectedMemo.memo);
    });
  }

  deleteMemo() {
    db.all("SELECT * FROM memos", async (_err, rows) => {
      const choices = rows.map((row) => ({
        name: String(row.id),
        message: row.memo.split("\n")[0],
        value: row.id,
      }));

      const prompt = new Select({
        name: "select",
        message: "Choose a note you want to delete:",
        choices: choices,
      });

      const selectedId = await prompt.run();
      db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
    });
  }
}

const memo = new Memo();
memo.main();
