const pg = require('pg');

let pool = null;

type QueryResult = Promise<object[]>;

const init = (options: Collection) => {
  pool = new pg.Pool(options);
};

const query = async (sql: string, args?: string | number[]): QueryResult => {
  const result = await pool.query(sql, args);
  return result.rows;
};

const crud = (table: string) => ({
  query,

  async read(id: number, fields: string[] = ['*']): QueryResult {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM ${table}`;
    if (!id) return query(sql);
    return query(`${sql} WHERE id = $1`, [id]);
  },

  async create({ ...record }: Collection): QueryResult {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }
    const fields = '"' + keys.join('", "') + '"';
    const params = nums.join(', ');
    const sql = `INSERT INTO "${table}" (${fields}) VALUES (${params})`;
    return query(sql, data);
  },

  async update([id, record]: [number, Collection]): QueryResult {
    const keys = Object.keys(record);
    const updates = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      updates[i] = `"${key}" = $${++i}`;
    }
    const delta = updates.join(', ');
    const sql = `UPDATE ${table} SET ${delta} WHERE id = $${++i}`;
    data.push(id);
    return query(sql, data);
  },

  async delete(id: number): QueryResult {
    const sql = `DELETE FROM ${table} WHERE id = $1`;
    return query(sql, [id]);
  },
});

module.exports = { init, crud };
