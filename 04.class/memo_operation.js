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
    const allMemos = await this.#db.all();
    allMemos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }

  async show() {
    const allMemos = await this.#db.all();
    const choices = allMemos.map((memo) => {
      const firstLine = memo.content.split("\n")[0];
      return {
        name: firstLine,
        value: memo.id,
      };
    });
    const prompt = new enquirer.Select({
      message: "Choose a memo you want to see:",
      choices,
      result(name) {
        const choice = this.choices.find((choice) => choice.name === name);
        return choice.value;
      },
    });

    const selectedId = await prompt.run();
    const selectedMemo = allMemos.find((memo) => memo.id === selectedId);
    console.log(selectedMemo.content);
  }

  async delete() {
    const allMemos = await this.#db.all();
    const choices = await allMemos.map((memo) => {
      const firstLine = memo.content.split("\n")[0];
      return {
        name: firstLine,
        value: memo.id,
      };
    });

    const prompt = new enquirer.Select({
      message: "Choose a memo you want to delete:",
      choices,
      result(name) {
        const choice = this.choices.find((choice) => choice.name === name);
        return choice.value;
      },
    });

    const selectedId = await prompt.run();
    await this.#db.deleteMemo(selectedId);
  }
}
