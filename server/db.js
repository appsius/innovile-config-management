const autocorrectionRoute = require('../data/Autocorrection.json');
const autocorrectionDetailRoute = require('../data/AutocorrectionDetail.json');
const operationTypeRoute = require('../data/OperationData.json');
const usersRoute = require('../data/Users.json');
const technologyRoute = require('../data/Technology.json');
const vendorRoute = require('../data/Vendor.json');

module.exports = function () {
  return {
    autocorrections: autocorrectionRoute,
    autocorrectionDetails: autocorrectionDetailRoute,
    operationTypes: operationTypeRoute,
    users: usersRoute,
    technologies: technologyRoute,
    vendors: vendorRoute,
  };
};
