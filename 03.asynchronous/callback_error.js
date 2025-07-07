import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.parallelize(() => {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO bookss (title) VALUES (?)",
        ["アーサー王物語"],
        function (err) {
          if (err) {
            console.log(`${err.message}`);
          }
          db.get("SELECT idd, title FROM books", (err) => {
            if (err) {
              console.log(`${err.message}`);
            }
            db.run("DROP TABLE IF EXISTS books");
          });
        },
      );
    },
  );
});
