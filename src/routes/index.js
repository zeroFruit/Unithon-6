import multer from 'multer';
import * as ctrl from '../controllers';

const upload = multer();

module.exports = (app) => {
  app.get('/', ctrl.getHome);
  app.get('/info', ctrl.getBucketInfo);
  app.post('/', upload.single('photo'), ctrl.postBook);
};
