const { Router } = require('express');
const DragonTable = require('../dragon/table');
const AccountDragonTable = require('../accountDragon/table');
const AccountTable = require('../account/table');
const { authenticatedAccount } = require('./helper');
const { getPublicDragons } = require('../dragon/helper');

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
  .catch(error => next(error));
})

router.get('/public-dragons', (req,res,next) => {
  getPublicDragons()
  .then(({ dragons }) => res.json({ dragons }))
  .catch(error => next(error))
})

router.post('/buy', (req, res, next) => {
  const { dragonId, setValue } = req.body;
  let buyerId;

  DragonTable.getDragon({ dragonId })
  .then(dragon => {
    if( dragon.setValue != setValue) {
      throw new Error ('Sale value is not correct');
    }

    if(!dragon.isPublic) {
      throw new Error('Sragon must be public')
    }
    return authenticatedAccount({ sessionString: req.cookies.sessionString })
  })
  .then(({ account, authenticated }) => {
    if(!authenticated) {
      throw new Error('Unauthenticated')
    }
    if(setValue > account.balance) {
      throw new Error('Sale value exceeds balance')
    }
    buyerId = account.id;

    return AccountDragonTable.getDragonAccount({ dragonId })
  })
  .then(({ accountId }) => {
    if(accountId === buyerId) {
      throw new Error('Can not by your own dragon!')
    }
    const sellerId = accountId;

    return Promise.all(([
      AccountTable.updateBalance({
        accountId: buyerId, value: -setValue
      }),
      AccountTable.updateBalance({
        accountId: sellerId, value: setValue
      }),
      AccountDragonTable.updateDragonAccount({
        dragonId, accountId: buyerId
      }),
      DragonTable.updateDragon({
        dragonId, isPublic: false
      })
    ]))
  })
  .then(() => res.json({ message: 'success!' }))
  .catch(error => next(error))
})

module.exports = router;