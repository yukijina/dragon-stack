const express = require('express');
//// middleware
const cors = require('cors');
const bodyParser = require('body-parser');
// Cookie parser is middleware
const cookieParser = require('cookie-parser');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

//// Cores - same origin policy
app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
/// bodyParser json function - it allows to write express post request
app.use(bodyParser.json());
app.use(cookieParser());


// create routes
app.use('/account', accountRouter);
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