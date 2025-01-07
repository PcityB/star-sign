import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { MatchService } from './match.service';

class MatchController extends BaseController {
  private matchService = new MatchService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const matchData = {
        ...req.body,
        userId1: +userId,
        userId2: +req.body.userId2,
        synastryScore: +req.body.synastryScore,
      };

      const match = await this.matchService.create(matchData);

      this.sendResponse(res, { match }, 201);
    });

  public getByUserId = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const matches = await this.matchService.getByUserId(+userId);

      this.sendResponse(res, { matches }, 200);
    });

  public accept = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const matchId = req.params.id;

      const updatedPreference = await this.matchService.accept(+matchId, +userId);

      this.sendResponse(res, { updatedPreference }, 200);
    });

  public delete = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const matchId = req.params.id;

      await this.matchService.accept(+matchId, +userId);

      this.sendResponse(res, true, 200);
    });
}

export { MatchController };
