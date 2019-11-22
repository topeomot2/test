
const ENV = process.env;

module.exports = {
  //
  get(key) {
    return ENV[String(key)];
  },

  //
  live: ENV.NODE_ENV === 'production' ? true : false,

  //
  maintenance: ENV.SITE_MODE === 'maintenance' ? true : false,

  //
  ...ENV,
};
