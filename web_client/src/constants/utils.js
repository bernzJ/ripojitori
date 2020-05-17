const upsert = (array, item, key = 'Id') => {
  const e = array.find(_i => _i[key] === item[key]);
  if (e) {
    return array.map(r => (r[key] === e[key] ? item : r));
  }
  return [...array, item];
};

export { upsert };
