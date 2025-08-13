import { db, executeSqliteRun, executeSqliteGet } from "./db_operation.js";

await executeSqliteRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
try {
  await executeSqliteRun(db, "INSERT INTO bookss (title) VALUES (?)", [
    "アーサー王物語",
  ]);
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await executeSqliteGet(db, "SELECT idd, title FROM books where id = ?", [1]);
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await executeSqliteRun(db, "DROP TABLE books");
