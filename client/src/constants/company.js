import ObjectID from 'bson-objectid';

const company = {
  _id: ObjectID(),
  name: '',
  clientName: '',
  clientType: '',
  hours: '',
  start: Date.now(),
  end: Date.now(),
  scope: 0
};

export default company;
