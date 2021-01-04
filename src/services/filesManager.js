const AWS = require('aws-sdk');
const BUCKET_NAME = 'yedidya-storage';
const s3 = new AWS.S3();

async function write(buffer, fileName) {
    try {
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: buffer.toString(),
          }).promise();
        
        console.log(`File ${fileName} written successfully`);
    } catch (ex) {
        console.log(`Failed write to file ${fileName} with error: ${ex}`);
    }
}

async function read(fileName) {
    try {
        data = await s3.getObject({
                Bucket: BUCKET_NAME,
                Key: fileName
                }).promise();

        const objectData = data.Body.toString('utf-8');
        console.log(`File ${fileName} read successfully`);

        return objectData;
    } catch (ex) {
        console.log(`Failed read from file ${fileName} with error: ${ex}`);
    }
}

module.exports = {
    write: write,
    read: read
}
