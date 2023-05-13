export default {
  port: 'PORT',
  baseUrl: 'BASE_URL',
  postgresConfig: {
    host: 'POSTGRES_HOST',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },
  redisConfig: {
    url: 'REDIS_URL',
  },
  mailConfig: {
    host: 'MAILTRAP_HOST',
    port: 'MAILTRAP_PORT',
    user: 'MAILTRAP_USERNAME',
    pass: 'MAILTRAP_PASSWORD',
    mailFrom: 'MAILTRAP_MAIL_FROM',
  },
};
