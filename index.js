var loopback = require('loopback');
var SolrConnector = require('./lib/solr-connector');

exports = module.exports = SolrConnector;

exports.createSearchModel = function (options) {
  options = options || {};

  var searchDataSource = loopback.createDataSource({
    connector: SolrConnector
  });

  var searchModel = searchDataSource.createModel(options.name || 'Search', {},
    { plural: options.plural || 'Search' });

  searchModel.remoteMethod('search', {
    accepts: [
      {
        arg: 'query',
        type: 'object',
        required: true,
        http: {
          source: 'body'
        }
      }
    ],
    returns: { root: true },
    http: {
      verb: 'POST',
      path: '/query'
    }
  });

  return searchModel;
};

exports.search = exports.createSearchModel();