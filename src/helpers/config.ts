import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

class Config {
  private static port: number = parseInt(process.env.PORT || '3000', 10);
  private static dbHost: string = process.env.DB_HOST || 'localhost';
  private static dbUser: string = process.env.DB_USER || 'root';
  private static dbPassword: string = process.env.DB_PASSWORD || '';
  private static dbName: string = process.env.DB_NAME || 'my_database';

  public static getPort(): number {
    return Config.port;
  }

  public static getDbHost(): string {
    return Config.dbHost;
  }

  public static getDbUser(): string {
    return Config.dbUser;
  }

  public static getDbPassword(): string {
    return Config.dbPassword;
  }

  public static getDbName(): string {
    return Config.dbName;
  }
}

export default Config;
