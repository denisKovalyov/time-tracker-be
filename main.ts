const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config');
const transport = require('./src/transport/http');
require('./src/modules/db').init(config.db);

const apiPath = path.join(__dirname, './src/api');
const routing: Routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = require(filePath);
  }

  transport(routing, config.api.port);
})();
