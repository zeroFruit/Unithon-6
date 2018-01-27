import AWS from 'aws-sdk';
import uuidv1 from 'uuid/v1';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const dydb = new AWS.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});

export const putItem = (tableName, payload) => new Promise((resolve, reject) => {
  const item = {};
  item.id = { S: uuidv1() };

  Object.keys(payload).forEach((key) => {
    switch(typeof payload[key]) {
      case 'string':
        item[key] = { S: payload[key] }
        break;
      case 'number':
        item[key] = { N: payload[key].toString() }
        break;
      default:
        return null;
    }
  });
  const params = {
    TableName: tableName,
    Item: item
  };
  dydb.putItem(params, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data);
  });
});
