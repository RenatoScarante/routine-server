import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository {
  constructor() {
    super(process.env.DB_TABLENAME_USER);
  }
}

export default UserRepository;
