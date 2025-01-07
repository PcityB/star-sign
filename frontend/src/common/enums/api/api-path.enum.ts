const ApiPath = {
  API_URL: import.meta.env.VITE_API_PATH || 'http://localhost:3000',

  // Auth routes
  AUTH: '/auth',
  AUTHENTICATED_USER: '/authenticated-user',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',

  // Users routes
  USERS: '/users',

  // Attributes routes
  ATTRIBUTES: '/attributes',
} as const;

export { ApiPath };
