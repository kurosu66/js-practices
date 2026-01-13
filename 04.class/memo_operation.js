import enquirer from "enquirer";

export default class MemoOperation {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async add(input) {
    await this.#db.addMemo(input);
  }

  async list() {
    const allMemos = await this.#db.getAllMemos();
    allMemos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }

  async show() {
    const choices = await this.#getMemoChoices();
    const prompt = new enquirer.Select({
      name: "select",
      message: "Choose a memo you want to see:",
      choices,
    });

    const selectedId = await prompt.run();
    const selectedMemo = await this.#db.getMemo(selectedId);
    console.log(selectedMemo);
  }

  async delete() {
    const choices = await this.#getMemoChoices();
    const prompt = new enquirer.Select({
      name: "select",
      message: "Choose a memo you want to delete:",
      choices,
    });

    const selectedId = await prompt.run();
    this.#db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }

  async #getMemoChoices() {
    const getAllMemos = await this.#db.getAllMemos();
    const choices = getAllMemos.map((memo) => ({
      name: String(memo.id),
      message: memo.content.split("\n")[0],
      value: memo.id,
    }));
    return choices;
  }
}
