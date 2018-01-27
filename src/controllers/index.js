import * as dydb from '../helpers/dynamodb';


export const getHome = (req, res) => {
  return res.send(
    `
      <h1>Unithon 6 Server</h1>
    `
  );
};

export const putItem = (req, res) => {
  const { tableName, payload } = req.body;

  dydb.putItem(tableName, payload)
    .then(() => res.send({
      message: 'success'
    }))
    .catch((err) => {
      return res.status(500).send(err)
    });
};

export const getItem = (req, res) => {
  const { tableName, key } = req.query;
  const _key = JSON.parse(key);

  dydb.getItem(tableName, _key)
    .then(data => res.send({ message: 'success', data }))
    .catch(err => res.status(500).send(err));
};

export const getItemFromDevice = (req, res) => {
  const tableName = 'test';
  const { payload } = req.body;

  dydb.putItem(tableName, payload)
    .then(() => res.send({
      message: 'success'
    }))
    .catch((err) => {
      return res.status(500).send(err)
    });
};
