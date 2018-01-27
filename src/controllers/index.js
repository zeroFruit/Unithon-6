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
