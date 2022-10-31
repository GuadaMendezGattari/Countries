//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Country} = require('./src/db');
const axios = require('axios');

const getInfoApi = async () => {
  const c = await axios.get('https://restcountries.com/v3/all');
  const countries = c.data.map(el => {
      return {
        cca3: el.cca3,
        name: el.name.common,
        flag: el.flags[1],
        capital: Array.isArray(el.capital) ? el.capital.join(', ') : el.capital,
        region: el.region,
        subregion: el.subregion,
        area: el.area,
        population: el.population
      };
  });
  return countries;
};

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  let countries = await Country.findAll();
  if(!countries.length) {
    const apiCountries = await getInfoApi();
    await Country.bulkCreate(apiCountries);
  }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
