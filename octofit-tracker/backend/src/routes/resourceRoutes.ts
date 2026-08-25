import { Router, Request, Response } from 'express';
import { Model } from 'mongoose';

export function createResourceRouter(model: Model<unknown>) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(500).json({ error: 'Unable to retrieve resources', details: error });
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: error });
    }
  });

  return router;
}