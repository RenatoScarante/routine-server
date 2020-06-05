import BaseController from "./BaseController";
import AuthService from "../services/AuthService";
import JwtService from "../services/JwtService";

class AuthController extends BaseController {
  constructor() {
    super();
    this._authService = new AuthService();
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

      this._authService
        .login(email, password)
        .then(user => {
          const token = this._jwtService.createToken({ email, password });
          this.success(res, { user, token });
        })
        .catch(error => this.error401(res, error.message));
    } catch (e) {
      console.log(e);
      this.error500(res, `Error on login, ${e.message}`);
    }
  };

  register = (req, res) => {
    try {
      const newUser = req.body;

      this._authService
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
      console.log(e);
      this.error500(res, `Error on register, ${e.message}`);
    }
  };
}

export default AuthController;

// exports.checkAuthorization = async (req, res, next) => {
//   if (req.baseUrl === process.env.ROUTE_AUTHENTICATION) {
//     next();
//     return;
//   }

//   if (
//     req.headers.authorization === undefined ||
//     req.headers.authorization.split(" ")[0] !== "Bearer"
//   ) {
//     const status = 401;
//     const message = "Bad authorization header";
//     res.status(status).json({ status, message });
//     return;
//   }
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     verifyToken(token);
//     next();
//   } catch (err) {
//     const status = 401;
//     const message = "Error: access_token is not valid";
//     res.status(status).json({ status, message });
//   }
// };

// // POST /api/auth/login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   let user = isAuthenticated({ email, password });

//   if (user === undefined) {
//     const status = 401;
//     const message = "Incorrect email or password.";
//     res.status(status).json({ status, message });
//     return;
//   }

//   if (user.active === false) {
//     const status = 401;
//     const message = "User inactive.";
//     res.status(status).json({ status, message });
//     return;
//   }

//   await repository.update({ ...user, lastLogin: new Date() });

//   const token = createToken({ email, password });

//   user = { ...user, password: null };

//   res.status(200).json({ user, token });
// };
