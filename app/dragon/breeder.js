const Dragon = require('./index');

class Breeder {
  static breedDragon({ matron, patron }){
    const matronTraits = matron.traits;
    const patronTraits = patron.traits;

    const babyTraits = []

      matronTraits.forEach(({ traitType, traitValue }) => {
        const matronTrait = traitValue;

        const patronTrait = patronTraits.find(
          trait => trait.traitType === traitType
        )

        babyTraits.push({
          traitType, 
          traitValue: Breeder.pickTrait({ matronTrait, patronTrait })
        })
      })

      return new Dragon({ nickname: 'Unnamed baby', traits: babyTraits })
  }

}

module.exports = Breeder;