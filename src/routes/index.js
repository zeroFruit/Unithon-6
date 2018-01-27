import * as ctrl from '../controllers';

module.exports = (app) => {
  app.get('/', ctrl.getHome);
  app.post('/test', ctrl.putItem);
};
