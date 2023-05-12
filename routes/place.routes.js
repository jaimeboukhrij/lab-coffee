const express = require('express');
const router = express.Router();
const Place = require('./../models/Place.model')

/* GET home page */
router.get("/crear", (req, res, next) => {
    res.render("places/places-create")
});

router.post("/crear", (req, res, next) => {
    const { name, type, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, type, location })
        .then(() => res.redirect("/places/list"))
        .catch(err => next(err))
});

router.get("/list", (req, res, next) => {
    Place
        .find()
        .then(places => res.render("places/places-list", { places }))
        .catch(err => next(err))

});



router.get("/edit/:id", (req, res, next) => {
    const { id } = req.params
    Place
        .findById(id)
        .then(places => res.render("places/places-edit", places))
        .catch(err => console.log(err))

});

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params

    const { name, type, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }


    Place
        .findByIdAndUpdate(id, { name, type, location })
        .then(() => res.redirect("/places/list"))
        .catch(err => next(err))

});




module.exports = router;