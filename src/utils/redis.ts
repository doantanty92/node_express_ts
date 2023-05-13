import { createClient } from 'redis';
import config from 'config';

type RedisConfigType = {
  url: string;
};
const redisConfig = config.get<RedisConfigType>('redisConfig');
const redisClient = createClient(redisConfig);

redisClient.on('error', (error) => {
  console.error(error);
});

export default redisClient;
