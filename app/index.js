const express = require('express');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

engine.start();

module.exports = app;

// setTimeout(() => {
//   engine.stop()
// }, 20000)



// const Generation = require('./generation');

// const generation = new Generation();

// console.log('generation', generation);

// const gooby = generation.newDragon();
// console.log('gooby', gooby)




// const Dragon = require('./dragon');

// const abc = new Dragon({
//   birthday: new Date(), 
//   nickname: "abc",
//   traits: [ { traitType: 'backgroundColor', traitValue: 'green' }]
// })

// setTimeout(() => {
//   const baloo = new Dragon({nickname: "baloo"})
//   console.log("baloo: ", baloo)
// }, 3000)

// const ccc = new Dragon();
// const ddd = new Dragon();
// console.log("abc: ", abc)
// console.log("ccc: ", ccc)
// console.log("ddd: ", ddd)