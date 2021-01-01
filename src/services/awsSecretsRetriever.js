const AWS = require('aws-sdk');
const client = new AWS.SecretsManager({ region: 'us-west-1' });

async function retrieve(name) {
    try {
        const data = await client.getSecretValue({SecretId: name}).promise();
        
        return data.SecretString;
    } catch (ex) {
        console.log(`Error while retrieving secret key: ${ex}`);
    }
}

module.exports = {
    retrieve: retrieve
}