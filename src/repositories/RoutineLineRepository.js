import BaseRepository from "./BaseRepository";

class RoutineLineRepository extends BaseRepository {
  constructor() {
    super(process.env.DB_TABLENAME_ROUTINE_LINE);
  }
}

export default RoutineLineRepository;
