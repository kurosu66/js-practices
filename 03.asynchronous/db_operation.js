import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(":memory:");

export function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getQuery(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
