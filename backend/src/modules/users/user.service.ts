import { PlanetaryPosition } from './../../../../node_modules/.prisma/client/index.d';
import { encryption } from '~/libs/encryption/encryption';
import { UserRepository } from './user.repository';
import { token } from '~/libs/token/token';
import prisma from '~/libs/prisma/prisma-client';
import { SignUpRequestDTO, UserDTO, UserPatchRequestDTO } from './user.model';
import { PlanetaryPositionService } from '../planetary-positions/planetary-positions.service';
import { PreferenceService } from '../preferences/preference.service';
import { SynastryScoreService } from '../synastry-score/synastry-score.service';
import { MatchService } from '../matches/match.service';

class UserService {
  private userRepository = new UserRepository(prisma);
  private planetaryPositionService = new PlanetaryPositionService();
  private preferenceService = new PreferenceService();
  private synastryScoreService = new SynastryScoreService();
  private matchService = new MatchService();

  public async create(userPayload: SignUpRequestDTO) {
    if (await this.userRepository.findByEmail(userPayload.email)) {
      throw { status: 409, errors: 'This email is already registered.' };
    }

    userPayload.password = await encryption.encrypt(userPayload.password);
    const user = await this.userRepository.create(userPayload);
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.isDeleted) {
      throw { status: 403, errors: 'There is no user with this credentials.' };
    }
    if (!(await encryption.compare(password, user.password))) {
      throw { status: 403, errors: 'Wrong email or password.' };
    }
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async update(userPayload: UserPatchRequestDTO, id: string, userId: string) {
    if ((await this.userRepository.find(id))?.id.toString() != userId) {
      throw { status: 403, errors: 'You cannot update this account.' };
    }

    const updatedUser = await this.userRepository.update(id, userPayload);
    if (!updatedUser) {
      throw { status: 500, errors: 'Error happened while updating the user.' };
    }
    if (updatedUser.birthLongitude && updatedUser.birthLatitude && updatedUser.birthTimestamp) {
      this.planetaryPositionService.calculatePlanetaryPositions(
        Number(updatedUser.id),
        updatedUser.birthLatitude,
        updatedUser.birthLongitude,
        updatedUser.birthTimestamp,
      );
    }

    return this.selectUserFields(updatedUser);
  }

  public async getAllByPreferences(userId: number) {
    const user = await this.userRepository.find(userId);
    const userPlanetaryPositions = user?.PlanetaryPosition[0];

    if (!userPlanetaryPositions) {
      return [];
    }
    const userPreferences = await this.preferenceService.getByUserId(userId);
    const goalIds = userPreferences?.goals?.map((goal) => goal.id) || [];

    const users = await this.userRepository.findUsersWithPreferences({
      minAge: userPreferences?.minAge || 18,
      maxAge: userPreferences?.maxAge || 99,
      userGender: user?.gender,
      gender: userPreferences?.gender,
      currentCity: userPreferences?.currentCity,
      currentCountry: userPreferences?.currentCountry,
      sunSign: userPreferences?.sunSign,
      moonSign: userPreferences?.moonSign,
      goals: goalIds,
    });

    const existingMatches = await this.matchService.getByUserId(userId);
    const existingMatchUserIds = new Set(
      (existingMatches || []).map((match) => (match.userId1 === userId ? match.userId2 : match.userId1)),
    );

    const filteredUsers = users.filter(
      (potentialMatch) => potentialMatch.id !== userId && !existingMatchUserIds.has(potentialMatch.id),
    );

    return filteredUsers.map((user) => {
      if (!user.PlanetaryPosition) {
        return;
      }
      const matchScore = this.synastryScoreService.calculateCompatibility(
        userPlanetaryPositions,
        user.PlanetaryPosition[0],
      );
      return { ...this.selectUserFields(user), matchScore };
    });
  }

  public async getById(id: string | number) {
    const user = await this.userRepository.find(id);
    return user && !user.isDeleted ? this.selectUserFields(user) : null;
  }

  public async getMatchPartnerById(userId: number, partnerId: number) {
    const match = await this.matchService.getByUserIds(userId, partnerId);
    if (!match) {
      return;
    }

    const user = await this.userRepository.find(partnerId);
    const matchScore = {
      totalScore: match.synastryScore,
    };
    return user && !user.isDeleted ? { ...this.selectUserFields(user), matchScore } : null;
  }

  private selectUserFields(user: UserDTO) {
    const {
      id,
      name,
      email,
      gender,
      birthTimestamp,
      birthLongitude,
      birthLatitude,
      birthCity,
      birthCountry,
      photos,
      description,
      createdAt,
      updatedAt,
      PlanetaryPosition,
      Preference,
    } = user;

    return {
      id,
      name,
      email,
      gender,
      birthTimestamp,
      birthLongitude,
      birthLatitude,
      birthCity,
      birthCountry,
      photos,
      description,
      createdAt,
      updatedAt,
      PlanetaryPosition: PlanetaryPosition ? PlanetaryPosition[0] : null,
      Preference,
    };
  }
}

export { UserService };
