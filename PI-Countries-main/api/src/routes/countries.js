const {Router} = require('express');
const {Country, Activity} = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const countries = await Country.findAll({include: Activity});
    const c = countries.map(el => {
        return {
            cca3: el.cca3,
            flag: el.flag,
            name: el.name,
            region: el.region,
            population: el.population,
            activities: el.activities
        }
    });
    if(!name) {
        res.send(c);
    } else {
        const filtrado = c.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        res.send(filtrado);
    }
});

router.get('/:idCountry', async (req, res) => {
    const {idCountry} = req.params;
    const country = await Country.findByPk(idCountry, {include: Activity});
    res.send(country);
});

module.exports = router;