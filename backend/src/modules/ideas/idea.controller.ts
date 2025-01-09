import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { IdeaService } from './idea.service';
import { AuthRequest } from '~/libs/middleware/auth.middleware';

class IdeaController extends BaseController {
  private ideaService = new IdeaService();

  public get = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const partnerId = req.query.partnerId as string;
      if (!partnerId) {
        throw { status: 400, errors: 'Partner ID is required.' };
      }

      const ideas = await this.ideaService.getDatingIdeas(+userId, +partnerId);
      this.sendResponse(res, ideas, 200);
    });
}

export { IdeaController };
