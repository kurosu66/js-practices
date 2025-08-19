import { db, executeSqliteRun, executeSqliteGet } from "./db_operation.js";

executeSqliteRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return executeSqliteRun(db, "INSERT INTO bookss (title) VALUES (?)", [
      "アーサー王物語",
    ]);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
    return executeSqliteGet(db, "SELECT idd, title FROM books where id = ?", [
      1,
    ]);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => {
    executeSqliteRun(db, "DROP TABLE books");
  });
