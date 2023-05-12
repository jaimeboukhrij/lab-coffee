const express = require('express');
const router = express.Router();

const Restaurant = require('./../models/Place.model')

router.get("/places", (req, res, next) => {

    Restaurant
        .find()
        .then(places => res.json(places))
        .catch(err => next(err))
});

module.exports = router