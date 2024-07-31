import knex, { Knex } from 'knex';
import config from '../knexfile';
import Config from '../helpers/config';

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

const DB_QUERY_EVENT = 'query';
const DB_ERROR_EVENT = 'query-error';
const KNEX_DIALECT = 'mssql';
const MS_SQL_PORT = '1433';
const MIN_POOL_SIZE = 2;
const MAX_POOL_SIZE = 10;

const createKnexInstance = (): Knex => {
  const instance = knex(connectionConfig);

  instance
    .on(DB_QUERY_EVENT, (queryData) => {
      let query = queryData.sql.replace(/\s\s+/g, ' ');
      queryData.bindings.forEach((param: any, i: any) => {
        query = query.replace(
          new RegExp(`@p${i}\\b`),
          typeof param === 'string' ? `'${param}'` : param,
        );
      });

      console.log('[QUERY]', query);
      console.log('[QUERY-PARAMETERS]: ', JSON.stringify(queryData.bindings));
    })
    .on(DB_ERROR_EVENT, (errorData) => {
      console.log('[DATABASE-ERROR] ' + errorData);
      console.log(
        '[DATABASE-ERROR-MESSAGE] ' + errorData.message.replace(/\s+/gm, ' '),
      );

      throw new Error();
    });

  // instance.on('query-response', (response, query) => {
  //   console.log(`Query Response: ${JSON.stringify(response)}`);
  //   console.log(`Execution Time: ${query.responseTime}ms`);
  // });

  // instance.on('query-error', (error, query) => {
  //   console.error(`Query Error: ${error.message}`);
  //   console.error(`Failed Query: ${query.sql}`);
  // });

  return instance;
};

export default createKnexInstance;
