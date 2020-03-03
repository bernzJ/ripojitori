import PropTypes from 'prop-types';

const user = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    scope: PropTypes.number.isRequired
  })
};

export default user;
