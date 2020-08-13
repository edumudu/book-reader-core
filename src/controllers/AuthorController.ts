import { Request, Response } from 'express';
import Author from '../entity/author';
import { errors } from '../variables/controller';

export default class AuthorController {
  public static async idnex(req: Request, res: Response): Promise<Response> {
    return res.json(await Author.find());
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const author = Author.create({ name });
      await author.save();

      return res.status(201).json(author);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  }
}
