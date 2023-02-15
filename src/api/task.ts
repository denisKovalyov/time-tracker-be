const db = require('../modules/db');

const project = db.crud('tasks');

module.exports = {
  ...project,

  async read(args: string[]) {
    return project.query(`SELECT * FROM tasks WHERE "userId" = $1 AND "projectId" = $2`, args);
  },
};

