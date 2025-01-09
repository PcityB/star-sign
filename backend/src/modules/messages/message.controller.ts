import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { MessageService } from './message.service';

class MessageController extends BaseController {
  private messageService = new MessageService();

  public create = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const messageData = {
        ...req.body,
        senderId: +userId,
        recipientId: +req.body.recipientId,
      };

      const message = this.messageService.create(messageData);

      this.sendResponse(res, message, 200);
    });
}

export { MessageController };
