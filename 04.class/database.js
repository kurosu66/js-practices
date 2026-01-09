import sqlite3 from "sqlite3";

export default class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath);
  }

  async initializeDatabase() {
    return this.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, memo TEXT NOT NULL)",
    );
  }

  addMemo(input) {
    this.db.run("INSERT INTO memos (memo) VALUES (?)", [input]);
  }

  getAllMemos() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
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
        (err, row) => {
          if (err) return reject(err);
          resolve(row.memo);
        },
      );
    });
  }
}
