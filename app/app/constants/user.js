import ObjectID from 'bson-objectid';

const user = {
  _id: ObjectID(),
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  scope: 0
};

export default user;
