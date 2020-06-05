const jsonServer = require("json-server");
const router = jsonServer.router(require("../db/db.js")());
const db = router.db;

class BaseRepository {
  constructor(tablename) {
    this._tablename = tablename;
  }

  getById = id => {
    return db
      .get(this._tablename)
      .getById(id)
      .value();
  };

  find = filter => {
    return db
      .get(this._tablename)
      .find(filter)
      .value();
  };

  insert = data => {
    var item = db
      .get(this._tablename)
      .insert(data)
      .value();

    db.write();

    return item;
  };

  update = data => {
    return db
      .get(this._tablename)
      .getById(data.id)
      .assign(data)
      .write();
  };

  filter = (filter, sortBy = "") => {
    return db
      .get(this._tablename)
      .filter(filter)
      .sortBy(sortBy)
      .value();
  };
}

export default BaseRepository;
