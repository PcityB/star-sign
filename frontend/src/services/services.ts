import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Users } from './users/users.service';
import { Attributes } from './attributes/attribute.service';

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const users = new Users({
  baseUrl: ApiPath.API_URL,
  http,
});

const attributes = new Attributes({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, users, attributes };
