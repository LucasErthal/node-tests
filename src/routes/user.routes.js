import * as userController from "../controllers/user.controller";

const userRoutes = (app) => {
  app.post("/user", userController.create);
  app.get("/users", userController.getAll);
  app.get("/user/:id", userController.getById);
  app.put("/user/:id", userController.update);
};

export default userRoutes;
