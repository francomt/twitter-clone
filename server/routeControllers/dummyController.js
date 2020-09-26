const getAllDummies = (req, res, next) => {
  //dummy info
  res.json({
    id: 1,
    name: 'Dummy',
    age: 21,
    email: 'dummy@email.com',
    realData: false,
  });
};

module.exports = {
  getAllDummies,
};
