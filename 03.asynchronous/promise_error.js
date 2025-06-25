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
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO bookss (title) VALUES (?)",
      ["アーサー王物語"],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

function dbSelect() {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, title FROM bookss", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function dbDrop() {
  return new Promise((resolve) => {
    db.run("DROP TABLE IF EXISTS books");
    resolve();
  });
}

function promise_error() {
  dbCreate()
    .then(() => dbInsert())
    .catch((err) => {
      console.log(err.message);
    })
    .then(() => dbSelect())
    .catch((err) => {
      console.log(err.message);
    })
    .then(() => dbDrop());
}

promise_error();
