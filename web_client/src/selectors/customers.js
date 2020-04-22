import { createSelector } from 'reselect';

const getFilter = ({ customersReducer: { filter } }) => filter.toLowerCase();
const getCustomers = ({ customersReducer: { customers } }) => customers;

const getAllCustomers = createSelector(
  [getFilter, getCustomers],
  (filter, customers) =>
    filter === ''
      ? customers
      : customers.filter(customer =>
          Object.keys(customer).find(
            key =>
              customer[key]
                .toString()
                .toLowerCase()
                .indexOf(filter) > -1
          )
        )
);

export default getAllCustomers;
