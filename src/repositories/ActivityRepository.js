import BaseRepository from "./BaseRepository";

class ActivityRepository extends BaseRepository {
  constructor() {
    super(process.env.DB_TABLENAME_ACTIVITY);
  }
}

export default ActivityRepository;
