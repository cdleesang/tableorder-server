export interface Environment {
    STORE_ID: string;
    ACCESS_TOKEN: string;
    STORE_MEMBER_ID: string;
    POS_DATABASE_HOST: string;
    POS_DATABASE_PORT?: number;
    POS_DATABASE_FILE_PATH: string;
    POS_DATABASE_USER: string;
    POS_DATABASE_PASSWORD: string;
    ADMIN_JWT_SECRET: string;
    ADMIN_REFRESH_JWT_SECRET: string;
    TABLE_JWT_SECRET: string;
}
