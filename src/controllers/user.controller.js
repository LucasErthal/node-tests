import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";
import * as userRepo from "../repositories/user.repository";

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body);

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await userRepo.createUser({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await userRepo.getUserById(id);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await userRepo.updateUser(id, req.body);

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await userRepo.deleteUser(id);

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};
