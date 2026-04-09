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
    const allMemos = await this.#db.findAll();
    allMemos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }

  async show() {
    const selectedMemo = await this.#chooseMemo(
      "Choose a memo you want to see:",
    );
    console.log(selectedMemo.content);
  }

  async delete() {
    const selectedMemo = await this.#chooseMemo(
      "Choose a memo you want to delete:",
    );
    await this.#db.deleteMemo(selectedMemo.id);
  }


  #createChoices(memos) {
    return memos.map((memo) => {
      const firstLine = memo.content.split("\n")[0];
      return {
        name: firstLine,
        value: memo.id,
      };
    });
  }

  async #chooseMemo(message) {
    const allMemos = await this.#db.findAll();
    const choices = this.#createChoices(allMemos);
    const prompt = new enquirer.Select({
      message,
      choices,
      result() {
        return this.focused.value;
      },
    });
    const selectedId = await prompt.run();
    return allMemos.find((memo) => memo.id === selectedId);
  }
}
