const TRAITS = require('../data/traits.json');

const DEFAULT_PROPERTIES = {
  nickname: 'unnamed',
  //// date is created when new Date() is created.
  //birthday: new Date()
  //// date is created when actual dragon is created/used 
  //// when there is setTimeout, the data will be the dragon is appiered in console.log
  get birthday() {
    return new Date()
  },
  get randomTraits() {
    const traits = []

    TRAITS.forEach(TRAIT => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;

      const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];

    traits.push({ traitType, traitValue })
    })
    return traits;
  }
}

class Dragon {
  // empty {} accept if instance was created with empty value ex. cosnt abc = new Dragon();
  // By wrapping properoties by {}, client can assigne as object
  constructor({ birthday, nickname, traits } = {}){
    this.birthday = birthday || DEFAULT_PROPERTIES.birthday;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
  }
}

module.exports = Dragon;