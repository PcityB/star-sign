import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { GoalDTO, InterestDTO } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Attributes {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.ATTRIBUTES;
  }

  public getAllGoals(): Promise<GoalDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl('/goals'), {
      method: 'GET',
      token,
    });
  }

  public getAllInterests(): Promise<InterestDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl('/interests'), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Attributes };
export type { Constructor as AttributesConstructor };
