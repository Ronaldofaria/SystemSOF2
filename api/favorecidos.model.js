const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Favorecidos = new Schema(
  {
    nomefav: {
      type: String
    },
    ender: {
      type: String
    },
    bai: {
      type: String
    },
    cid: {
      type: String
    },
    cep: {
      type: String
    },
    uf: {
      type: String
    },
    cnpj: {
      type: String
    },
    banrec: {
      type: String
    },
    agerec: {
      type: String
    },
    ccrec: {
      type: String
    }
},
      { collection: 'favorecidos'}
);

module.exports = mongoose.model('Favorecidos', Favorecidos);
