import { dbCreate, dbDrop } from "./db_operation.js";
import { db } from "./db_operation.js";

function dbInsert() {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["アーサー王物語"],
      function (err) {
        if (err) {
          reject(err);
        } else {
          console.log(`ID:${this.lastID}`);
          resolve();
        }
      },
    );
  });
}

function dbSelect() {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, title FROM books", (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${row.id} ${row.title}`);
        resolve();
      }
    });
  });
}

async function async_no_error() {
  await dbCreate();
  await dbInsert();
  await dbSelect();
  await dbDrop();
}

async_no_error();
