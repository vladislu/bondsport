import path from "path";

export interface IKnexfileConfig {
  client: string;
  connection: string;
  pool: {
    min: number;
    max: number;
  };
  migrations: {
    tableName: string;
    directory: string;
  };
  seeds: {
    directory: string;
  };
}
interface IKnexfile {
  test: IKnexfileConfig;
  local: IKnexfileConfig;
  [key: string]: IKnexfileConfig;
}

const knexfileConfigLocal: IKnexfileConfig = {
  client: "pg",
  connection: process.env.DATABASE_URL || "postgres://bondsport:bondsport@localhost:5432/bondsport",
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.resolve(__dirname, "../../", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "../../", "seeds"),
  },
};

export const knexfile: IKnexfile = {
  test: knexfileConfigLocal,
  local: knexfileConfigLocal,
  dev: knexfileConfigLocal,
  stg: knexfileConfigLocal,
  prod: knexfileConfigLocal,
};

export default knexfile[process.env.NODE_ENV || "local"];
