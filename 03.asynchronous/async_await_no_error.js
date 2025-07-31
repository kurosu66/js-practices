import { db, executeRunQuery, executeGetQuery } from "./db_operation.js";

async function asyncNoError() {
  await executeRunQuery(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL UNIQUE)",
  );
  const insertMsg = await executeRunQuery(
    db,
    "INSERT INTO books (title) VALUES (?)",
    ["アーサー王物語"],
  );
  console.log(insertMsg.lastID);
  const getMsg = await executeGetQuery(db, "SELECT id, title FROM books");
  console.log(`${getMsg.id} ${getMsg.title}`);
  await executeRunQuery(db, "DROP TABLE books");
}

asyncNoError();
