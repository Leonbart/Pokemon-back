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
const { conn } = require('./src/db/db.js');
const storeTypesFromAPItoDB = require('./src/db/storeTypesFromAPItoDB.js');
const { Type } = require("./src/db/db.js");
require('dotenv').config();
const port = process.SERVER_PORT || 3001;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  // Get all pokemon's types from API and store them in DB
  storeTypesFromAPItoDB(Type);
  // .then((data) => console.log(data.map(t => t.toJSON().name)));

  server.listen(port, () => {
    console.log(`Local DB API Listening at port ${port}`); // eslint-disable-line no-console
  });
});
