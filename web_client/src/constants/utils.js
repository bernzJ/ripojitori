const upsert = (array, item, key = 'Id') => {
  const e = array.find(_i => _i[key] === item[key]);
  if (e) {
    return array.map(r => (r[key] === e[key] ? item : r));
  }
  return [...array, item];
};

const buildSelectDefaultValues = (
  values,
  select = { value: 'Name', label: 'Name' }
) => {
  if (!values) {
    return [];
  }
  return values.reduce((acc, cur) => {
    acc.push({
      value: cur[select.value],
      label: cur[select.label]
    });
    return acc;
  }, []);
};

export { upsert, buildSelectDefaultValues };
