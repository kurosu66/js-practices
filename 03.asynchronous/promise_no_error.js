import { db, executeSqliteRun, executeSqliteGet } from "./db_operation.js";

executeSqliteRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    executeSqliteRun(db, "INSERT INTO books (title) VALUES (?)", [
      "アーサー王物語",
    ]),
  )
  .then((result) => {
    console.log(result.lastID);
    return executeSqliteGet(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`${row.id} ${row.title}`);
    return executeSqliteRun(db, "DROP TABLE books");
  });
