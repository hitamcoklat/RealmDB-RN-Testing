let Realm = require('realm');
let realm = new Realm({
  schema: [
    {
      name: 'Hero',
      primaryKey: 'id',
      properties: {
        id: 'int',
        heroName: 'string',
      },
    },
  ],
});

export const createHeroDB = (heroName) => {
  var msg = {};
  const dataHero = realm.objects('Hero');
  try {
    realm.write(() => {
      realm.create('Hero', {
        id: dataHero.length + 1,
        heroName: heroName,
      });
    });
    msg.status = true;
    msg.message = 'Berhasil';
  } catch (error) {
    msg.status = false;
    msg.message = 'Gagal';
  } finally {
    return msg;
  }
};

// result: realm objects
export const getAllHeroesDB = () => {
  var msg = {};
  try {
    // msg.result = Array.from(realm.objects('Hero'));
    msg.result = realm.objects('Hero');
    msg.message = 'Get all heroes successful!';
  } catch (e) {
    msg.result = [];
    msg.message = 'Get all heroes failed!';
  } finally {
    return msg;
  }
};

// result: realm object
export const getHeroByName = (heroName) => {
  var msg = {};
  let heroes = getAllHeroesDB().result;
  let findHero = heroes.filtered('heroName CONTAINS[c] "' + heroName + '"'); // return collections
  // console.log(Array.from(findHero));
  findHero = Array.from(findHero);
  if (findHero.length == 0) {
    msg.result = null;
    msg.message = `Not found hero with name=${heroName}`;
  } else {
    msg.result = findHero;
    msg.message = `Found ${findHero.length} hero with name=${heroName}`;
  }
  return msg;
};

const checkIfHeroExists = (id) => {
  let hero = getHeroById(id).result;
  return hero != null;
};