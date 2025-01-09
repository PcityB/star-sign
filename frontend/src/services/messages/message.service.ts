import { MessageDTO } from '~/common/types/types';
import { ApiPath } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Messages {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.MESSAGES;
  }

  public getAllBySenderAndRecipient(recipientId: number): Promise<MessageDTO[]> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: {
        recipientId: recipientId.toString(),
      },
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Messages };
export type { Constructor as MessagesConstructor };
