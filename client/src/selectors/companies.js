import { createSelector } from 'reselect';

const getFilter = ({ apiReducer: { filter } }) => filter.toLowerCase();
const getCompanies = ({ apiReducer: { companies } }) => companies;

// const getAllCompanies = createSelector([getCompanies], companies => companies);

const getAllCompanies = createSelector(
  [getFilter, getCompanies],
  (filter, companies) =>
    filter === ''
      ? companies
      : companies.filter(company =>
          Object.keys(company).find(
            key =>
              company[key]
                .toString()
                .toLowerCase()
                .indexOf(filter) > -1
          )
        )
);

export default getAllCompanies;
