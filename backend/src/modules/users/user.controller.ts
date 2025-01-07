import { AuthRequest } from '~/libs/middleware/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '~/libs/core/base-controller';
import { UserService } from './user.service';
import { signInRequestSchema, signUpRequestSchema } from '~/libs/common/common';
import { ImageService } from '../images/image.service';

class UserController extends BaseController {
  private userService = new UserService();
  private imageService = new ImageService();

  public signUp = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const userPayload = req.body;
        const { user, jwtToken } = await this.userService.create(userPayload);
        this.sendResponse(res, { user, token: jwtToken }, 201);
      },
      signUpRequestSchema,
    );

  public signIn = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(
      req,
      res,
      next,
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { user, jwtToken } = await this.userService.signIn(email, password);
        this.sendResponse(res, { user, token: jwtToken }, 200);
      },
      signInRequestSchema,
    );

  public getAuthenticatedUser = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const user = await this.userService.getById(userId);
      this.sendResponse(res, { user }, 200);
    });

  public patchUser = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;
      const updatedUserId = req.params.id;
      let photosUrls = req.body.photos || [];
      let photosFiles = (req.files as Express.Multer.File[]) || [];

      if (!Array.isArray(photosUrls)) {
        photosUrls = [photosUrls];
      }

      photosUrls = [
        ...photosUrls,
        ...(await Promise.all(photosFiles.map((file) => this.imageService.upload(file.path, file.originalname)))),
      ];

      const userData = {
        ...req.body,
        birthTimestamp: new Date(req.body.birthTimestamp).toISOString(),
        photos: photosUrls,
      };

      const updatedUser = this.userService.update(userData, updatedUserId, userId);

      this.sendResponse(res, { updatedUser }, 200);
    });

  public deleteCurrentUser = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const userData = {
        isDeleted: true,
      };

      const updatedUser = this.userService.update(userData, userId, userId);

      this.sendResponse(res, { updatedUser }, 200);
    });

  public getAllByPreferences = (req: Request, res: Response, next: NextFunction) =>
    this.handleRequest(req, res, next, async (req: AuthRequest, res: Response) => {
      const userId = req.user?.id as string;

      const users = await this.userService.getAllByPreferences(+userId);

      this.sendResponse(res, { users }, 200);
    });
}

export { UserController };
