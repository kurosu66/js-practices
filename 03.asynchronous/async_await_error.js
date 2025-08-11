import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

await executeRunQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
);
try {
  await executeRunQuery(db, "INSERT INTO bookss (title) VALUES (?)", [
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
  await executeGetQuery(db, "SELECT idd, title FROM books");
} catch (err) {
  if (err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await executeRunQuery(db, "DROP TABLE books");
