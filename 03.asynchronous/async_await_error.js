import { runQuery, getQuery } from "./db_operation.js";

async function async_with_error() {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await runQuery("INSERT INTO bookss (title) VALUES (?)", ["アーサー王物語"]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await getQuery("SELECT idd, title FROM books");
  } catch (err) {
    console.log(err.message);
  }
  await runQuery("DROP TABLE books");
}

async_with_error();
