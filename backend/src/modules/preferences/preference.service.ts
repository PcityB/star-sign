import prisma from '~/libs/prisma/prisma-client';
import { PreferenceRepository } from './preference.repository';
import { PreferenceCreateRequestDTO } from './preference.model';

class PreferenceService {
  private preferenceRepository = new PreferenceRepository(prisma);

  public async update(payload: Partial<PreferenceCreateRequestDTO>) {
    const updatedPreference = await this.preferenceRepository.createOrUpdate(payload);
    if (!updatedPreference) {
      throw { status: 500, errors: 'Error happened while updating preferences.' };
    }

    return updatedPreference;
  }

  public async getByUserId(userId: number) {
    return await this.preferenceRepository.findByUserId(userId);
  }
}

export { PreferenceService };
