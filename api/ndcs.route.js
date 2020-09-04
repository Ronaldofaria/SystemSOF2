
const express = require('express');
const ndcsRoute = express.Router();

// Require Business model in our routes module
let Ndc = require('./ndcs.model');

// Defined store route
ndcsRoute.route('/add').post(function (req, res) {
  let ndc = new Ndc(req.body);
  ndc.save()
    .then(ndc => {
      res.status(200).json({'Ndcs': 'business in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ndcsRoute.route('/').get(function (req, res) {
    Ndc.find(function(err,ndc){
    if(err){
      console.log(err);
    }
    else {
      res.json(ndc);
    }
  });
});

// Defined edit route
ndcsRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Ndc.findById(id, function (err, ndc){
      res.json(ndc);
  });
});

//  Defined update route
ndcsRoute.route('/update/:id').post(function (req, res) {
    Ndc.findById(req.params.id, function(err, ndc) {
    if (!ndc)
      res.status(404).send("data is not found");
    else {
        ndc.numndc = req.body.numndc;
        ndc.procndc = req.body.procndc;
        ndc.datandc = req.body.datandc;
        ndc.evendc  = req.body.evendc;
        ndc.secret  = req.body.secret;
        ndc.unigest  = req.body.unigest;
        ndc.progtrab = req.body.progtrab;
        ndc.natdesp = req.body.natdesp;
        ndc.fontrec = req.body.fontrec;
        ndc.nomefav = req.body.nomefav;
        ndc.ender = req.body.ender;
        ndc.bai = req.body.bai;
        ndc.cid = req.body.cid;
        ndc.cep = req.body.cep;
        ndc.cnpj = req.body.cnpj;
        ndc.uf = req.body.uf;
        ndc.valor = req.body.valor;
        ndc.extenso = req.body.extenso;
        ndc.descdesp = req.body.descdesp;
        ndc.jan = req.body.jan;
        ndc.fev = req.body.fev;
        ndc.mar = req.body.mar;
        ndc.abr = req.body.abr;
        ndc.mai = req.body.mai;
        ndc.jun = req.body.jun;
        ndc.jul = req.body.jul;
        ndc.ago = req.body.ago;
        ndc.set = req.body.set;
        ndc.out = req.body.out;
        ndc.nov = req.body.nov;
        ndc.dez = req.body.dez;
        ndc.baselegal = req.body.baselegal;
        ndc.emissor = req.body.emissor;
        ndc.deleemi = req.body.deleemi;
        ndc.matemi = req.body.matemi;
        ndc.dataemi = req.body.dataemi;
        ndc.ordenador = req.body.ordenador;
        ndc.deleord = req.body.deleord;
        ndc.matord = req.body.matord;
        ndc.dataord = req.body.dataord;
        ndc.ratificador = req.body.ratificador;
        ndc.delerat = req.body.delerat;
        ndc.matrat = req.body.matrat;
        ndc.datarat = req.body.datarat;
        ndc.save().then(ndc => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
ndcsRoute.route('/delete/:id').get(function (req, res) {
    Ndc.findByIdAndRemove({_id: req.params.id}, function(err, ndc){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = ndcsRoute;

