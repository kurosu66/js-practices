import enquirer from "enquirer";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");
const { Select } = enquirer;

class MemoOperation {
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

export default MemoOperation;
