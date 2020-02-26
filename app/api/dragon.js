const { Router } = require('express');
const DragonTable = require('../dragon/table');

const router = new Router();

router.get('/new', (req, res, next) => {
  const dragon = res.app.locals.engine.generation.newDragon();
  DragonTable.storeDragon(dragon)
  .then(({ dragonId }) => {
    console.log('dragonId', dragonId);
    dragon.dragonId = dragonId;
    res.json({ dragon });
  })
  .catch(err => next(err));   // this err trigger index.js app.use handler (line 17)
});

module.exports = router;