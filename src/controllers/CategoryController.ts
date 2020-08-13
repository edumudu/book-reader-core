import { Request, Response } from 'express';
import Category from '../entity/category';
import { errors } from '../variables/controller';

export default class CategoryController {
  public static async index(request: Request, response: Response): Promise<Response> {
    const count = await Category.count();
    const categorys = await Category.find();

    response.header('x-total-count', String(count));

    return response.status(200).json(categorys);
  }

  public static async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      const category = Category.create({ name });
      await category.save();

      return response.status(201).json(category);
    } catch (err) {
      return response.status(400).json(errors.syntax('create'));
    }
  }

  public static async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    try {
      await Category.update({ id: +id }, { name });

      return response.json(await Category.findOne({ id: +id }));
    } catch (err) {
      return response.status(400).send(errors.syntax('update'));
    }
  }

  public static async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      await Category.delete({ id: +id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'));
    }
  }
}
