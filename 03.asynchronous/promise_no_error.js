import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function dbCreate() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      },
    );
  });
}

function dbInsert() {
  return new Promise((resolve) => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["アーサー王物語"],
      function () {
        console.log(`ID:${this.lastID}`);
        resolve();
      },
    );
  });
}

function dbSelect() {
  return new Promise((resolve) => {
    db.get("SELECT id, title FROM books", (err, row) => {
      console.log(`${row.id} ${row.title}`);
      resolve();
    });
  });
}

function dbDrop() {
  return new Promise((resolve) => {
    db.run("DROP TABLE IF EXISTS books");
    resolve();
  });
}

function promise_no_error() {
  dbCreate()
    .then(() => dbInsert())
    .then(() => dbSelect())
    .then(() => dbDrop());
}

promise_no_error();
