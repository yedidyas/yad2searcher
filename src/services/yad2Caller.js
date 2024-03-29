const axios = require('axios');
const filesManager = require('../services/filesManager');

const search = async (city, neighborhood, name, filesDir) => {
    return new Promise(async (resolve, reject) => {
        try {
        // const res = await axios.get(`https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/forsale?city=${city}&neighborhood=${neighborhood}&property=1&rooms=4-4&price=1800000-2300000&parking=1&elevator=1`,
        // const res = await axios.get(`https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/forsale?city=${city}&property=1&rooms=3-3.5&price=700000-950000`,
            const res = await axios.get(`https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/rent?topArea=2&area=4&city=7900&street=0261&propertyGroup=apartments&forceLdLoad=true`,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.31',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });    

        await filesManager.write(JSON.stringify(res.data.feed.feed_items), `${filesDir}/${name}.json`);

        const filteredResults = filterResults(res);
        console.log(`Search ${name} finished successfully`);
        resolve(filteredResults);

        } catch (ex) {
            console.log(`Search ${name} failed with error: ${ex}`);
            reject(ex);
        }
    });
}

const filterResults = (results) => {
    let linkTokens;
    try {
        linkTokens = results.data.feed.feed_items.filter(item => item.type === 'ad').map(item => item.link_token);
    } catch (ex) {
        throw new Error(`failed to extract results from result: ${JSON.stringify(results.data)}`);
    }
    return Object.values(linkTokens);
};

module.exports = {
    search: search
}