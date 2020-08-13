import { Request, Response } from 'express';
import Artist from '../entity/artist';
import { errors } from '../variables/controller';

export default class ArtistController {
  public static async index(req: Request, res: Response): Promise<Response> {
    return res.json(await Artist.find());
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const artist = Artist.create({ name });
      await artist.save();

      return res.status(201).json(artist);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  }
}
