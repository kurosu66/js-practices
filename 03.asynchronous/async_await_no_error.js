import { getQuery, runQuery } from "./db_operation.js";

async function async_no_error() {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  const insertMsg = await runQuery("INSERT INTO books (title) VALUES (?)", [
    "アーサー王物語",
  ]);
  console.log(insertMsg.lastID);
  const getMsg = await getQuery("SELECT id, title FROM books");
  console.log(`${getMsg.id} ${getMsg.title}`);
  await runQuery("DROP TABLE books");
}

async_no_error();
