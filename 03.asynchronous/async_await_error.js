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

async function async_with_error() {
  await dbCreate(db);
  try {
    await dbInsert_with_error(db);
  } catch (err) {
    console.error(err.message);
  }
  try {
    await dbSelect_with_error(db);
  } catch (err) {
    console.error(err.message);
  }
  await dbDrop(db);
}

async_with_error();
