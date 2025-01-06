import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { PreferenceService } from './preference.service';

class PreferenceController extends BaseController {
  private preferenceService = new PreferenceService();

  public update = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const preferenceData = {
        ...req.body,
        userId: +userId,
      };

      const updatedPreference = this.preferenceService.update(preferenceData);

      this.sendResponse(res, { updatedPreference }, 200);
    });
}

export { PreferenceController };
