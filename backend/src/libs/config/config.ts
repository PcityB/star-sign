import dotenv from 'dotenv';

dotenv.config();

interface Config {
  postgresUri: string;
  secretKey: string;
}

function requireEnv(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(
      `${name} is required but not defined in the environment variables`
    );
  }
  return variable;
}

const config: Config = {
  postgresUri: requireEnv(process.env.POSTGRES_URI, 'POSTGRES_URI'),
  secretKey: requireEnv(process.env.SECRET_KEY, 'SECRET_KEY'),
};

export default config;
