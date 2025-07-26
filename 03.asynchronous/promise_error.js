import { db, runQuery, getQuery } from "./db_operation.js";

function promise_with_error() {
  runQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  ).then(() =>
    runQuery(db, "INSERT INTO bookss (title) VALUES (?)", ["アーサー王物語"])
      .catch((err) => {
        console.error(err.message);
      })
      .then(() =>
        getQuery(db, "SELECT idd, title FROM books")
          .catch((err) => {
            console.error(err.message);
          })
          .then(() => runQuery(db, "DROP TABLE books")),
      ),
  );
}

promise_with_error();
