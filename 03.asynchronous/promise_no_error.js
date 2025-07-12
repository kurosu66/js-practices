import { db, dbCreate, dbDrop } from "./db_operation.js";

function dbInsert(db) {
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

function dbSelect(db) {
  return new Promise((resolve) => {
    db.get("SELECT id, title FROM books", (err, row) => {
      console.log(`${row.id} ${row.title}`);
      resolve();
    });
  });
}

function promise_no_error() {
  dbCreate(db)
    .then(() => dbInsert(db))
    .then(() => dbSelect(db))
    .then(() => dbDrop(db));
}

promise_no_error();
