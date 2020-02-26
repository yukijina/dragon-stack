const { Router } = require('express');

const router = new Router();

router.get('/new', (req,res) => {
  res.json({ dragon: res.app.locals.engine.generation.newDragon()})
});

module.exports = router;