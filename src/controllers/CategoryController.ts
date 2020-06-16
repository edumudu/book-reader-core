import { Request, Response } from 'express';
import Category from '../models/Category';
import { errors } from '../variables/controller';
import verifyAuthorization from '../utils/verifyAuthorization';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const count = await Category.count('id');
    const categorys = await Category.findAll();

    response.header('x-total-count', String(count));

    return response.status(200).json(categorys);
  },

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    if (!(await verifyAuthorization(Number(request.headers.userId)))) {
      return response.status(401).json(errors.permition);
    }

    try {
      const category = await Category.create({ name });

      return response.status(201).json(category);
    } catch (err) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    if (!(await verifyAuthorization(Number(request.headers.userId)))) {
      return response.status(401).json(errors.permition);
    }

    try {
      const category = await Category.update({ name }, { id });

      return response.json(category);
    } catch (err) {
      return response.status(400).send(errors.syntax('update'));
    }
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!(await verifyAuthorization(Number(request.headers.userId)))) {
      return response.status(401).json(errors.permition);
    }

    try {
      await Category.destroy({ id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'));
    }
  },
};
