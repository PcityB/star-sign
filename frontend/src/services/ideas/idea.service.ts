import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { DatingIdea } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Ideas {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.IDEAS;
  }

  public get(partnerId: string): Promise<DatingIdea[]> {
    const token = getToken();
    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: {
        partnerId,
      },
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Ideas };
export type { Constructor as IdeasConstructor };
