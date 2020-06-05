import BaseRepository from "./BaseRepository";

class RoutineRepository extends BaseRepository {
  constructor() {
    super(process.env.DB_TABLENAME_ROUTINE);
  }
}

export default RoutineRepository;
