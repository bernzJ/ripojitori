import ObjectID from 'bson-objectid';

const company = {
  _id: ObjectID(),
  projectResource: '',
  clientName: '',
  segment: '',
  category: '',
  status: '',
  hours: '',
  start: Date.now(),
  end: Date.now(),
  scope: 0
};

export default company;
