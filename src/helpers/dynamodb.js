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

const makeDynamoPayload = (payload) => {
  const _item = {};
  _item.id = { S: uuidv1() };
  const item = mapKey(_item, payload);

  return item;
};

const makeDynamoKey = (payload) => {
  const _item = {};
  const item = mapKey(_item, payload);

  return item;
};

const mapKey = (item, payload) =>
  Object.keys(payload).forEach((key) => {
    switch(typeof payload[key]) {
      case 'string':
        item[key] = { S: payload[key] };
        break;
      case 'number':
        item[key] = { N: payload[key].toString() };
        break;
      default:
        return null;
    }
  });
  

export const putItem = (tableName, payload) =>
  new Promise((resolve, reject) => {
    const item = makeDynamoPayload(payload);
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

export const getItem = (tableName, key) =>
  new Promise((resolve, reject) => {
    const _key = makeDynamoKey(key);
    const params = {
      TableName: tableName,
      Key: _key
    };

    dydb.getItem(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
