import moment from 'moment';
import * as s3 from '../helpers/s3';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function getHome(req, res) {
  return res.send(
    `
      <h1>Page App Asset Server</h1>
      <h2>beta-0.0.1</h2>
      <br>
    `
  );
}

function getBucketInfo(req, res) {
  return res.json({
    bucket: process.env.AWS_BUCKET_NAME
  });
}


function postBook(req, res) {
  const { buffer, originalname, mimetype } = req.file;
  const key = originalname.split('.')[0];
  s3.upload(buffer, key, mimetype)
    .then((result) => {
      console.log(`${moment().format('YY-MM-DD HH:mm:ss')} Successfully upload.`);
      return res.json(result);
    });
}

export {
  getHome,
  getBucketInfo,
  postBook
};
