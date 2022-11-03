import { Router } from "express";
import UserController from "../controllers/userController";

class UserRouter extends UserController {

    public routes(): Array<Router>
    {
      return [
        Router().get("/user", (req, res)=> this.getUser(req, res)),
        Router().post("/signup", (req, res)=> this.signup(req, res)),
        Router().post("/login", (req, res)=> this.login(req, res))
      ]
    }

}

export default new UserRouter();