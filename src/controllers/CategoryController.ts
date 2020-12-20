import { Request, Response } from 'express';
import { Like } from 'typeorm';
import Category from '../models/category';

export default class CategoryController {
  public static async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page || 1);
    const perPage = Number(request.query.perPage || 1);
    const search = request.query.search || '';

    const [categories, categoriesCount] = await Category.findAndCount({
      where: { name: Like(`%${search}%`) },
      order: { name: 'ASC' },
      take: perPage,
      skip: page * perPage - perPage,
    });

    return response.status(200).json({
      data: categories,
      meta: {
        perPage,
        currentPage: page,
        totalItems: categoriesCount,
        totalPages: Math.ceil(categoriesCount / perPage),
      },
    });
  }

  public static async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      const category = Category.create({ name });
      await category.save();

      return response.status(201).json({ data: category });
    } catch (err) {
      return response.status(400).json({ message: 'Error while createing category' });
    }
  }

  public static async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const id = Number(request.params.id);

    try {
      const category = await Category.findOneOrFail(id);

      category.name = name;
      await Category.save(category);

      return response.json({ data: category });
    } catch (err) {
      return response.status(400).send({ message: 'Error while update category' });
    }
  }

  public static async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    try {
      const category = await Category.findOneOrFail(id);
      await category.remove();

      return response.status(200).json({ data: category });
    } catch (err) {
      return response.status(400).json({ message: 'Error while removing category' });
    }
  }
}
