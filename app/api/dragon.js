const { Router } = require('express');
const DragonTable = require('../dragon/table');
const AccountDragonTable = require('../accountDragon/table');
const { authenticatedAccount } = require('./helper');

const router = new Router();

router.get('/new', (req, res, next) => {
  let accountId, dragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
  .then(({ account }) => {
    accountId = account.id;

    dragon = req.app.locals.engine.generation.newDragon({ accountId });

    return DragonTable.storeDragon(dragon)

  })
  .then(({ dragonId }) => {
    dragon.dragonId = dragonId;
    return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
   })
   .then(() => res.json({ dragon }))
   .catch(err => next(err));   // this err trigger index.js app.use handler (line 17) 
});

router.put('/update', (req, res, next) => {
  const { dragonId ,nickname, isPublic, setValue } = req.body;

  DragonTable.updateDragon({ dragonId, nickname, isPublic, setValue })
  .then(() => res.json({message: 'successfully updated dragon' }))
  .cath(error => next(error));
})

module.exports = router;