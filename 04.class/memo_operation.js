import enquirer from "enquirer";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");
const { Select } = enquirer;

export default class MemoOperation {
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

  async detail() {
    const choices = this.#getMemoChoices();
    const prompt = new Select({
      name: "select",
      message: "Choose a note you want to see:",
      choices: choices,
    });

    const selectedId = await prompt.run();
    const selectedMemo = await new Promise((resolve) => {
      db.get(
        "SELECT memo from memos WHERE id = ?",
        [selectedId],
        (_err, row) => {
          resolve(row.memo);
        },
      );
    });
    console.log(selectedMemo);
  }

  async delete() {
    const choices = this.#getMemoChoices();
    const prompt = new Select({
      name: "select",
      message: "Choose a note you want to delete:",
      choices: choices,
    });

    const selectedId = await prompt.run();
    db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }

  #getMemoChoices() {
    return new Promise((resolve) => {
      db.all("SELECT * FROM memos", (_err, rows) => {
        const choices = rows.map((row) => ({
          name: String(row.id),
          message: row.memo.split("\n")[0],
          value: row.id,
        }));
        resolve(choices);
      });
    });
  }
}
