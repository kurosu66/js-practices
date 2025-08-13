import { db, executeSqliteRun, executeSqliteGet } from "./db_operation.js";

await executeSqliteRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
const result = await executeSqliteRun(
  db,
  "INSERT INTO books (title) VALUES (?)",
  ["アーサー王物語"],
);
console.log(result.lastID);
const row = await executeSqliteGet(
  db,
  "SELECT id, title FROM books where id = ?",
  [1],
);
console.log(`${row.id} ${row.title}`);
await executeSqliteRun(db, "DROP TABLE books");
