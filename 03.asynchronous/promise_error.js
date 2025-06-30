import { dbCreate, dbDrop } from "./db_operation.js";
import { db } from "./db_operation.js";

function dbInsert_with_error() {
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

function dbSelect_with_error() {
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

function promise_with_error() {
  dbCreate()
    .then(() => dbInsert_with_error())
    .catch((err) => {
      console.log(err.message);
    })
    .then(() => dbSelect_with_error())
    .catch((err) => {
      console.log(err.message);
    })
    .then(() => dbDrop());
}

promise_with_error();
