import BaseService from "./BaseService";
import PersonRepository from "../repositories/PersonRepository";

class PersonService extends BaseService {
  constructor() {
    super(new PersonRepository());
  }
}

export default PersonService;
