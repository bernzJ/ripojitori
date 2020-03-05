const scopes = {
  PLEB: 0,
  SUB: 1,
  ADMIN: 2
};

const invertedScopes = {
  0: 'PLEB',
  1: 'SUB',
  2: 'ADMIN'
};

const intScopeToString = intScope => invertedScopes[intScope];

export { scopes, intScopeToString };
