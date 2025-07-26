import { db, runQuery, getQuery } from "./db_operation.js";

async function async_with_error() {
  await runQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await runQuery(db, "INSERT INTO bookss (title) VALUES (?)", [
      "アーサー王物語",
    ]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await getQuery(db, "SELECT idd, title FROM books");
  } catch (err) {
    console.error(err.message);
  }
  await runQuery(db, "DROP TABLE books");
}

async_with_error();
