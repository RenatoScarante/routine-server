import BaseRepository from "./BaseRepository";

class PersonRepository extends BaseRepository {
  constructor() {
    super(process.env.DB_TABLENAME_PERSON);
  }
}

export default PersonRepository;
