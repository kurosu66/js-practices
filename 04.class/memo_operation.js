import enquirer from "enquirer";

export default class MemoOperation {
  constructor(db) {
    this.db = db;
  }

  add(input) {
    this.db.run("INSERT INTO memos (memo) VALUES (?)", [input]);
  }

  async list() {
    const rows = await this.db.getAllMemos();
    rows.forEach((row) => {
      console.log(row.memo.split("\n")[0]);
    });
  }

  async show() {
    const choices = await this.#getMemoChoices();
    const prompt = new enquirer.Select({
      name: "select",
      message: "Choose a memo you want to see:",
      choices: choices,
    });

    const selectedId = await prompt.run();
    const selectedMemo = await this.db.getMemo(selectedId);
    console.log(selectedMemo);
  }

  async delete() {
    const choices = await this.#getMemoChoices();
    const prompt = new enquirer.Select({
      name: "select",
      message: "Choose a memo you want to delete:",
      choices: choices,
    });

    const selectedId = await prompt.run();
    this.db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }

  async #getMemoChoices() {
    const rows = await this.db.getAllMemos();
    const choices = rows.map((row) => ({
      name: String(row.id),
      message: row.memo.split("\n")[0],
      value: row.id,
    }));
    return choices;
  }
}
