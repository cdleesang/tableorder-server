export interface Environment {
  STORE_ID: string,
  ACCESS_TOKEN: string,
  STORE_MEMBER_ID: string,
  POS_DATABASE_HOST: string,
  POS_DATABASE_PORT?: number,
  POS_DATABASE_FILE_PATH: string,
  POS_DATABASE_USER: string,
  POS_DATABASE_PASSWORD: string,
  JWT_SECRET: string,
}