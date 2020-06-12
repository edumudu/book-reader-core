import { Request, Response } from 'express';
import connection from '../database/connection';
import { errors } from '../variables/controller';
import verifyAuthorization from '../utils/verifyAuthorization';

const table = 'tb_category';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const count = await connection(table).count('id');
    const categorys = await connection(table).select('*');

    response.header('x-total-count', String(count));

    return response.status(200).json(categorys);
  },

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    if (!(await verifyAuthorization(Number(request.headers.userId)))) {
      return response.status(401).json(errors.permition);
    }

    const data = { name };

    try {
      const [id] = await connection(table).insert(data);

      return response.status(201).json({ id, ...data });
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
      await connection(table).where('id', id).update({ name });

      return response.status(204).send();
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
      await connection(table).where({ id }).delete();

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'));
    }
  },
};
