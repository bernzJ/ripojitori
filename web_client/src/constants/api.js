const endpoints = {
  DEV: 'http://localhost:5000',
  PROD: 'http://ec2-3-134-111-217.us-east-2.compute.amazonaws.com:5000'
};

const api = {
  auth: {
    login: `${endpoints.DEV}/auth/login`,
    jwtLogin: `${endpoints.DEV}/auth/jwt-login`,
    logout: `${endpoints.DEV}/auth/logout`
  },
  admin: {
    get: `${endpoints.DEV}/admin/users`,
    create: `${endpoints.DEV}/admin/users/create`,
    delete: `${endpoints.DEV}/admin/users/del`
  },
  customers: {
    get: `${endpoints.DEV}/customers`,
    create: `${endpoints.DEV}/customers/create`,
    delete: `${endpoints.DEV}/customers/del`
  },
  industries: {
    get: `${endpoints.DEV}/industries`,
    create: `${endpoints.DEV}/industries/create`
  },
  timezones: {
    get: `${endpoints.DEV}/timezones`
  },
  countries: {
    get: `${endpoints.DEV}/countries`
  },
  OMS: {
    get: `${endpoints.DEV}/OMS`
  },
  states: {
    get: `${endpoints.DEV}/states`
  }
};

export default api;
