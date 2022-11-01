import { Router } from "express";
import UserController from "../controllers/userController";

class UserRouter extends UserController {

    public routes(): Array<Router>
    {
      return [
        Router().get("/user", (req, res)=> this.getUser(req, res)),
      ]
    }

}

export default new UserRouter();