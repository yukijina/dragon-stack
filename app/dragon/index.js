const TRAITS = require('../../data/traits.json');

const DEFAULT_PROPERTIES = {
  dragonId: undefined,
  nickname: 'unnamed',
  generationId: undefined,
  isPublic: false,
  setValue: 0,
  //// date is created when new Date() is created.
  //birthdate: new Date()
  //// date is created when actual dragon is created/used 
  //// when there is setTimeout, the data will be the dragon is appiered in console.log
  get birthdate() {
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
  constructor({ dragonId, birthdate, nickname, traits, generationId, isPublic, setValue } = {}){
    this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
    this.setValue = setValue || DEFAULT_PROPERTIES.setValue;
  }
}

module.exports = Dragon;