import { db, executeSqliteRun, executeSqliteGet } from "./db_operation.js";

executeSqliteRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    executeSqliteRun(db, "INSERT INTO bookss (title) VALUES (?)", [
      "アーサー王物語",
    ]),
  )
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => {
    return executeSqliteGet(db, "SELECT idd, title FROM books");
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => {
    return executeSqliteRun(db, "DROP TABLE books");
  });
