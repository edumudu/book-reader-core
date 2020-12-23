import { Request, Response } from 'express';
import { Like } from 'typeorm';

import Organization from '../models/organization';
import User from '../models/user';

export default class OrganizationController {
  public static async index(req: Request, res: Response) {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 15);
    const search = req.query.search || '';

    const [categories, categoriesCount] = await Organization.findAndCount({
      where: { name: Like(`%${search}%`) },
      order: { name: 'ASC' },
      take: perPage,
      skip: page * perPage - perPage,
    });

    return res.json({
      data: categories,
      meta: {
        perPage,
        currentPage: page,
        totalItems: categoriesCount,
        totalPages: Math.ceil(categoriesCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { userId } = res.locals as { userId: number };
    const user = await User.findOneOrFail(userId);
    const { name } = req.body as { name: string };

    try {
      const organization = Organization.create({ name });

      organization.user = user;
      await organization.save();

      return res.json({ data: organization });
    } catch (error) {
      return res.status(400).json({ message: 'Errror while creating organization' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const user = await User.findOneOrFail(res.locals.userId);
    const organizationId = Number(req.params.id);
    const { name } = req.body as { name: string };

    try {
      const organization = await Organization.findOneOrFail(organizationId, { relations: ['user'] });

      if (organization.user.id !== user.id) {
        return res.status(403).json({ message: 'You not is the organization owner' });
      }

      organization.name = name;
      await organization.save();

      return res.json({ data: organization });
    } catch (error) {
      return res.status(400).json({ message: 'Errror while updating organization' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const user = await User.findOneOrFail(res.locals.userId);
    const organizationId = Number(req.params.id);

    try {
      const organization = await Organization.findOneOrFail(organizationId, { relations: ['user'] });

      if (organization.user.id !== user.id) {
        return res.status(403).json({ message: 'You not is the organization owner' });
      }

      await organization.remove();

      return res.json({ data: organization });
    } catch (error) {
      return res.status(400).json({ message: 'Errror while destroyng organization' });
    }
  }
}
