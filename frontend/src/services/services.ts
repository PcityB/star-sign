import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Users } from './users/users.service';
import { Attributes } from './attributes/attribute.service';
import { Matches } from './matches/match.service';
import { Preferences } from './preferences/preference.service';
import { Messages } from './messages/message.service';

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

const matches = new Matches({
  baseUrl: ApiPath.API_URL,
  http,
});

const preferences = new Preferences({
  baseUrl: ApiPath.API_URL,
  http,
});

const messages = new Messages({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, users, attributes, matches, preferences, messages };
