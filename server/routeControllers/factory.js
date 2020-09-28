const catchAsync = require('../utilities/catchAsync');

exports.getAll = (Model) => catchAsync(async (req, res, next) => {});

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.modelName.toLowerCase();
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(
        new Error(`No ${modelName} found with the ID: ${req.params.id}`)
      );

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelName = Model.modelName.toLowerCase();
    const doc = Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });
