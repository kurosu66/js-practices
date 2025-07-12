import { db, dbCreate, dbDrop } from "./db_operation.js";

function dbInsert_with_error(db) {
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

function dbSelect_with_error(db) {
  return new Promise((resolve, reject) => {
    db.get("SELECT idd, title FROM books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function promise_with_error() {
  dbCreate(db)
    .then(() => dbInsert_with_error(db))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => dbSelect_with_error(db))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => dbDrop(db));
}

promise_with_error();
