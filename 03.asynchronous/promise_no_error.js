import { runQuery, getQuery } from "./db_operation.js";

function promise_no_error() {
  runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  ).then(() =>
    runQuery("INSERT INTO books (title) VALUES (?)", ["アーサー王物語"])
      .then((result) => {
        console.log(result.lastID);
      })
      .then(() =>
        getQuery("SELECT id, title FROM books")
          .then((row) => {
            console.log(`${row.id} ${row.title}`);
          })
          .then(() => runQuery("DROP TABLE books")),
      ),
  );
}

promise_no_error();
