const mongoose = require('mongoose');

const licenceSchema = mongoose.Schema({
  
  enseigne: String,
  site: String,
  siret: String,
  code_naf: String,
  code_tva: String,
  phone: String,
  adress: String,
  zip_code: String,
  ville: String,
  pays: String,
  nb_postes: String,
  duree_utilisation: String,
  client_email: String,
  client_pwd: String,
  licence: String,
  code_licence: String,
  exercice: String,
  email: String
});

module.exports = mongoose.model('Licenses', licenceSchema);