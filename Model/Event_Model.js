const mongooes = require("mongoose");

const schema = mongooes.Schema;

const Event_Schema = new schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

module.exports = mongooes.model('Event',Event_Schema);
// title:String!
// description: String!
// price:Float!
// date:String!
