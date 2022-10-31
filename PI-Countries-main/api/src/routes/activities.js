const {Router} = require('express');
const {Country, Activity} = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const activities = await Activity.findAll({include: Country});
    res.send(activities);
});

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;
    let activity = await Activity.create({name, difficulty, duration, season});
    let country = await Country.findAll({where: {name: countries}});
    activity.addCountries(country);
    res.send('Activity successfully created');
});

module.exports = router;