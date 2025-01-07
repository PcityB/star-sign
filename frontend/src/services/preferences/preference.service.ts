import { PreferenceCreateRequestDTO, UserDTO } from '~/common/types/types';
import { ApiPath, ContentType } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Preferences {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.PREFERENCES;
  }

  public update(data: PreferenceCreateRequestDTO): Promise<UserDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/`), {
      method: 'PATCH',
      payload: JSON.stringify(data),
      contentType: ContentType.JSON,
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Preferences };
export type { Constructor as UsersConstructor };
