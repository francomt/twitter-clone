const catchAsync = require('../utilities/catchAsync');
const APIFeatures = require('../utilities/apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const modelName = Model.modelName.toLowerCase() + 's';
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        [modelName]: doc,
      },
    });
  });

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
