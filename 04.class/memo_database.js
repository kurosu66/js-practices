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
    return this.run("INSERT INTO memos (content) VALUES (?)", [input]);
  }

  deleteMemo(selectedId) {
    return this.run("DELETE FROM memos WHERE id = ?", [selectedId]);
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id ASC", (err, memos) => {
        if (err) {
          reject(err);
        } else {
          resolve(memos);
        }
      });
    });
  }
}
