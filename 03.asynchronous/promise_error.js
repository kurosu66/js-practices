import { runQuery, getQuery } from "./db_operation.js";

function promise_with_error() {
  runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  ).then(() =>
    runQuery("INSERT INTO bookss (title) VALUES (?)", ["アーサー王物語"])
      .catch((err) => {
        console.error(err.message);
      })
      .then(() =>
        getQuery("SELECT idd, title FROM books")
          .catch((err) => {
            console.error(err.message);
          })
          .then(() => runQuery("DROP TABLE books")),
      ),
  );
}

promise_with_error();
