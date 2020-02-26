const express = require('express');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

// create routes
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

// app.use allows us to tale callback and access the handler - Express middleware
// next - go to next express middleware
app.use((err, req, res, next) => {
 /// or const statusCode = err.statuCode || 500;
 // res.status(statusCode).json({
  res.status(500).json({
    status: 500,
    type: 'error',
    message: err.message
  })
});

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