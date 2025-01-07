import { MatchDTO, MatchCreateRequestDTO } from '~/common/types/types';
import { ApiPath } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Matches {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.MATCHES;
  }

  public create(data: MatchCreateRequestDTO): Promise<MatchDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: JSON.stringify(data),
      token,
      contentType: 'application/json',
    });
  }

  public getByUserId(): Promise<MatchDTO[]> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'GET',
      token,
    });
  }

  public accept(id: string): Promise<MatchDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      token,
      contentType: 'application/json',
    });
  }

  public delete(id: string): Promise<boolean> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Matches };
export type { Constructor as MatchesConstructor };
