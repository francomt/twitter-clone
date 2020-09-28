class APIFeatures {
  constructor(query, input) {
    this.query = query;
    this.input = input;
  }

  filter() {
    //filter the query object
    const queryObj = { ...this.input };
    const excludeFields = ['page', 'sort', 'fields', 'limit'];
    excludeFields.forEach((val) => delete queryObj[val]);

    //advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    if (this.input.sort) {
      const sortBy = this.input.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.input.fields) {
      const fields = this.input.fields.split(',').join(' ') + ' -__v';
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.input.page * 1 || 1;
    const limitVal = this.input.limit * 1 || 100;
    const skipVal = (page - 1) * limitVal;

    this.query = this.query.skip(skipVal).limit(limitVal);

    return this;
  }
}

module.exports = APIFeatures;
