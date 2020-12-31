import { Request, Response } from 'express';

import Language from '../models/language';

export default class LanguageController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 15);

    const [languages, languageCount] = await Language.findAndCount({
      order: { id: 'ASC' },
      take: perPage,
      skip: page * perPage - perPage,
    });

    return res.json({
      data: languages,
      meta: {
        perPage,
        currentPage: page,
        totalItems: languageCount,
        totalPages: Math.ceil(languageCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { name, unicode } = req.body;

    try {
      const language = Language.create({ name, unicode });

      await language.save();

      return res.json({ data: language });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while creating language' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { name, unicode } = req.body;

    try {
      const language = await Language.findOneOrFail(id);

      language.name = name;
      language.unicode = unicode;

      await language.save();

      return res.json({ data: language });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while updating language' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    try {
      const language = await Language.findOneOrFail(id);

      await language.remove();

      return res.json({ data: language });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while destroyng language' });
    }
  }
}
