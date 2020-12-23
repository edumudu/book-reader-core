import { Request, Response } from 'express';
import { Like } from 'typeorm';

import Artist from '../models/artist';

export default class ArtistController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 1);
    const search = req.query.search || '';

    const [artists, artistsCount] = await Artist.findAndCount({
      where: { name: Like(`%${search}%`) },
      order: { name: 'ASC' },
      take: perPage,
      skip: perPage * page - perPage,
    });

    return res.json({
      data: artists,
      meta: {
        perPage,
        currentPage: page,
        totalItems: artistsCount,
        totalPages: Math.ceil(artistsCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const artist = Artist.create({ name });
      await artist.save();

      return res.status(201).json({ data: artist });
    } catch (err) {
      return res.status(400).json({ message: 'Error while creating artist' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { name } = req.body;

    try {
      const artist = await Artist.findOneOrFail(id);

      artist.name = name;
      await artist.save();

      return res.json({ data: artist });
    } catch (error) {
      return res.status(400).json({ message: 'Error while updating artist' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    try {
      const artist = await Artist.findOneOrFail(id);

      await artist.remove();

      return res.json({ data: artist });
    } catch (error) {
      return res.status(400).json({ message: 'Error while removing artist' });
    }
  }
}
