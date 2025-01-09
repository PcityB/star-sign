import { UserDTO, UserPatchRequestDTO, UserWithMatchScoreDTO } from '~/common/types/types';
import { ApiPath } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Users {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.USERS;
  }

  public update(id: string, data: UserPatchRequestDTO): Promise<UserDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'photos') formData.append(key, value as string);
    });
    if (data.photos) {
      data.photos.forEach((file) => {
        formData.append('photos', file);
      });
    }
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      payload: formData,
      token,
    });
  }

  public deleteCurrentUser(): Promise<UserDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'DELETE',
      token,
    });
  }

  public getAllByPreference(): Promise<UserWithMatchScoreDTO[]> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'GET',
      token,
    });
  }

  public getMatchPartnerById(partnerId: number): Promise<UserWithMatchScoreDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${partnerId}`), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Users };
export type { Constructor as UsersConstructor };
