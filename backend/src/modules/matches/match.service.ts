import prisma from '~/libs/prisma/prisma-client';
import { MatchRepository } from './match.repository';
import { MatchCreateRequestDTO } from './match.model';

class MatchService {
  private matchRepository = new MatchRepository(prisma);

  public async create(match: MatchCreateRequestDTO) {
    return await this.matchRepository.createOrUpdate(match);
  }

  public async getAll() {
    return await this.matchRepository.findAll();
  }

  public async getByUserId(userId: number) {
    return await this.matchRepository.findByUserId(userId);
  }

  public async getByUserIds(userId1: number, userId2: number) {
    return await this.matchRepository.findByUserIds(userId1, userId2);
  }

  public async accept(matchId: number, userId: number) {
    const match = await this.matchRepository.find(matchId);
    if (!match || match.userId1 !== userId || match.userId2 !== userId) {
      throw { status: 403, errors: 'You cannot update this match.' };
    }
    match.isAccepted = true;
    return await this.matchRepository.update(matchId, match);
  }

  public async delete(matchId: number, userId: number) {
    const match = await this.matchRepository.find(matchId);
    if (!match || (match.userId1 !== userId && match.userId2 !== userId)) {
      throw { status: 403, errors: 'You cannot delete this match.' };
    }
    if (match.isAccepted) {
      match.isAccepted = false;
      await this.matchRepository.update(matchId, match);
      return true
    }
    return await this.matchRepository.delete(matchId);
  }
}

export { MatchService };
