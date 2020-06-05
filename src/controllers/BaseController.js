class BaseController {
  constructor() {}

  success = (res, object) => res.status(200).json(object);
  error401 = (res, message) => res.status(401).json({ status: 401, message });
  error500 = (res, message) => res.status(500).json({ message });
}

export default BaseController;
