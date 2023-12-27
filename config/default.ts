export default {
    //origin: 'http://localhost:3000',
    origin: '*',
    accessTokenExpiresIn: 60*24*30, // 30 days
    refreshTokenExpiresIn: 60*24*30*2, // 30 days
    redisCacheExpiresIn: 60*24, // 1 day
  };
  