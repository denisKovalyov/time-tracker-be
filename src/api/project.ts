const db = require('../modules/db');

const project = db.crud('projects');

module.exports = {
  async read(args: string[]) {
    return project.query(`SELECT id, name FROM projects INNER JOIN "userProject" ON id = "userProject"."projectId" AND "userProject"."userId" = $1`, args);
  },
};
