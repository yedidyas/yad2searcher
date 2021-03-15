const yad2Caller = require('../services/yad2Caller');
const data = require('../data_avidan');
const filesManager = require('../services/filesManager');
const emailSender = require('../services/emailSender');

module.exports.search = async (event, context, callback) => {
  const promises = [];

  const folderName = new Date().toLocaleString().replace(/:/g,"-").replace(/\//g,"-").replace(/,/g,"");
  const dir = `resultsHistory/${folderName}`;

  for (item of data.searchData) {
    promises.push(yad2Caller.search(item.city, item.neighborhood, item.name, dir));
  }

  const oldresultsFileContext = await filesManager.read('currentResults.txt');
  const oldResults = oldresultsFileContext.split(',');

  const promisesResults = await Promise.all(promises);
  const arrayPromisesResults = [].concat.apply([], promisesResults);
  const currentResults = [...new Set(arrayPromisesResults)];

  const deltaBetweenOldToCurrentResults = currentResults
    .filter(x => !oldResults.includes(x));
  
  if (deltaBetweenOldToCurrentResults.length > 0) {
    await emailSender.send(convertIdsToLinks(deltaBetweenOldToCurrentResults).join(', '));
  } else {
    console.log('I didn\'t find anything new');
  }
  
  await filesManager.write([...new Set([...currentResults ,...oldResults])], 'currentResults.txt');
  await filesManager.write(deltaBetweenOldToCurrentResults, 'deltaBetweenOldToCurrentResults.txt');

  callback(null, {
          statusCode: 200,
          body: deltaBetweenOldToCurrentResults
        });  
};

function convertIdsToLinks(ids) {
  return ids.map(id => 'https://www.yad2.co.il/item/' + id);
}