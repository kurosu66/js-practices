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
  await dbCreate();
  try {
    await dbInsert_with_error();
  } catch (err) {
    console.log(err.message);
  }
  try {
    await dbSelect_with_error();
  } catch (err) {
    console.log(err.message);
  }
  await dbDrop();
}

async_with_error();
