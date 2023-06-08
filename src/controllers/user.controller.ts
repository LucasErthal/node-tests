import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userValidation } from "../validations/user.validation";
import * as userRepo from "../repositories/user.repository";

export const create = async (req: Request, res: Response) => {
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

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await userRepo.getUserById(id);

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await userRepo.updateUser(id, req.body);

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await userRepo.deleteUser(id);

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};
