import { dbCreate, dbDrop } from "./promise_db_operation.js";
import { db } from "./promise_db_operation.js";

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

function promise_no_error() {
  dbCreate()
    .then(() => dbInsert())
    .then(() => dbSelect())
    .then(() => dbDrop());
}

promise_no_error();
