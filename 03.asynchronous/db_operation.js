import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export function dbCreate() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      },
    );
  });
}

export function dbDrop() {
  return new Promise((resolve) => {
    db.run("DROP TABLE books");
    resolve();
  });
}
