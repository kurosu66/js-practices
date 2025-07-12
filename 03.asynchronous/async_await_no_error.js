import { db, dbCreate, dbDrop } from "./db_operation.js";

function dbInsert(db) {
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

function dbSelect(db) {
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
  await dbCreate(db);
  await dbInsert(db);
  await dbSelect(db);
  await dbDrop(db);
}

async_no_error();
