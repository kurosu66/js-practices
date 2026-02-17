import sqlite3 from "sqlite3";

export default class MemoDatabase {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  async initializeDatabase() {
    return this.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, content TEXT NOT NULL)",
    );
  }

  addMemo(input) {
    this.db.run("INSERT INTO memos (content) VALUES (?)", [input]);
  }

  getAllMemos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id ASC", (err, memo) => {
        if (err) return reject(err);
        resolve(memo);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve(this);
      });
    });
  }

  getMemo(selectedId) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM memos WHERE id = ?",
        [selectedId],
        (err, memo) => {
          if (err) return reject(err);
          resolve(memo.content);
        },
      );
    });
  }

  deleteMemo(selectedId) {
    this.db.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }
}
