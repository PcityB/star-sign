import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { MessageService } from './message.service';

class MessageController extends BaseController {
  private messageService = new MessageService();

  public getAllBySenderAndRecipient = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const recipientId = req.query.recipientId as string;
      if (!recipientId) {
        throw { status: 400, errors: 'Recipient ID is required.' };
      }
      console.log(userId, recipientId);

      const messages = await this.messageService.getAllBySenderAndRecipient(+userId, +recipientId);
      this.sendResponse(res, messages, 200);
    });
}

export { MessageController };
