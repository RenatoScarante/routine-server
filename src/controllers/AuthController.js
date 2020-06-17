import BaseController from "./BaseController";
import AuthService from "../services/AuthService";
import JwtService from "../services/JwtService";

class AuthController extends BaseController {
  constructor() {
    super(new AuthService());
    this._jwtService = new JwtService();
  }

  checkAuthorization = (req, res, next) => {
    if (
      req.baseUrl === process.env.ROUTE_AUTH_LOGIN ||
      req.baseUrl === process.env.ROUTE_AUTH_REGISTER
    ) {
      next();
      return;
    }

    if (
      req.headers.authorization === undefined ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      this.error401(res, "Bad authorization header");
      return;
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      this._jwtService.verifyToken(token);
      next();
    } catch (err) {
      this.error401(res, "Error: Token is not valid");
    }
  };

  login = (req, res) => {
    try {
      const { email, password } = req.body;

      this._service
        .login(email, password)
        .then(user => {
          const token = this._jwtService.createToken({ email, password });
          this.success(res, { user, token });
        })
        .catch(error => this.error401(res, error.message));
    } catch (e) {
      this.error500(res, `Error on login, ${e.message}`);
    }
  };

  register = (req, res) => {
    try {
      const newUser = req.body;

      this._service
        .register(newUser)
        .then(user => {
          this._authService
            .login(user.email, user.password)
            .then(user => {
              const token = this._jwtService.createToken({
                email: user.email,
                password: user.password
              });
              this.success(res, { user, token });
            })
            .catch(error => this.error401(res, error.message));
        })
        .catch(error => this.error401(res, error.message));
    } catch (e) {
      this.error500(res, `Error on register, ${e.message}`);
    }
  };
}

export default AuthController;
