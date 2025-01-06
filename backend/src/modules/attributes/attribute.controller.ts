import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { AttributeService } from './attribute.service';

class AttributeController extends BaseController {
  private attributeService = new AttributeService();

  public getAllGoals = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const categories = await this.attributeService.getAllGoals();
      this.sendResponse(res, categories, 200);
    });

  public getAllInterests = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: Request, res: Response) => {
      const categories = await this.attributeService.getAllInterests();
      this.sendResponse(res, categories, 200);
    });
}

export { AttributeController };
