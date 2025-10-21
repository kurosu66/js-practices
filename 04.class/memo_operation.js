import enquirer from "enquirer";
const { Select } = enquirer;

export default class MemoOperation {
  constructor(db) {
    this.db = db;
  }

  post(input) {
    this.db.run("INSERT INTO memos (memo) VALUES (?)", [input]);
  }

  index() {
    this.db.all("SELECT * FROM memos", (_err, rows) => {
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
      this.db.get(
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
    this.db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }

  #getMemoChoices() {
    return new Promise((resolve) => {
      this.db.all("SELECT * FROM memos", (_err, rows) => {
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
