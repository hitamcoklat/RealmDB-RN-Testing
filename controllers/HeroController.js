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
  let idPrimary = findPrimaryId(dataHero.length + 1);

  try {
    realm.write(() => {
      realm.create('Hero', {
        id: idPrimary,
        heroName: heroName,
      });
    });
    msg.status = true;
    msg.message = 'Berhasil';
  } catch (error) {
    msg.status = false;
    msg.message = 'Gagal';
    msg.debug = error;
  } finally {
    return msg;
  }
};

// result: realm objects
export const getAllHeroesDB = () => {
  var msg = {};
  try {
    // msg.result = Array.from(realm.objects('Hero'));
    msg.result = realm.objects('Hero').sorted('id', true);
    msg.message = 'Get all heroes successful!';
  } catch (e) {
    msg.result = [];
    msg.message = 'Get all heroes failed!';
  } finally {
    return msg;
  }
};

// result: realm object
export const getHeroById = (id) => {
  let msg = {};
  let heroes = getAllHeroesDB().result;
  let findHero = heroes.filtered(`id=${id}`); // return collections
  if (findHero.length == 0) {
    msg.result = null;
    msg.message = `Not found hero with id=${id}`;
  } else {
    msg.result = findHero[0];
    msg.message = `Found 1 hero with id=${id}`;
  }
  return msg;
}

export const updateHero = (hero) => {
  console.log(hero)
  let msg = {};
  try {
    let updte = realm.objects('Hero');
    let updt = updte.filtered(`id=${hero.id}`);
    updt = Array.from(updt);
    console.log(updt)

    // hapus data sebelumnya
    deleteHeroById(hero.id);

    realm.write(() => {
      realm.create('Hero', {
        id: hero.id,
        heroName: hero.heroName,
      });
    });
    msg.result = true;
    msg.message = `Update hero with id=${hero.id} successful`;
  } catch (e) {
    msg.result = false;
    msg.message = `Update hero with id=${hero.id} failed: ${e.message}`;
  } finally {
    return msg;
  }   
}

// result: realm object
export const getHeroByName = (heroName) => {
  var msg = {};
  let heroes = getAllHeroesDB().result;
  let findHero = heroes.filtered('heroName CONTAINS[c] "' + heroName + '"'); // return collections
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

export const deleteHeroById = (id) => {
  var msg = {};
  try {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Hero', id));
    });
    msg.status = true;
    msg.message = 'Berhasil';
  } catch (error) {
    msg.status = false;
    msg.message = error;
  } finally {
    return msg;
  }  
}

const findPrimaryId = (idPrimary) => {
  if (!checkIfHeroExists(idPrimary)) {
    return idPrimary
  } else {
    return findPrimaryId(idPrimary + 1)
  }
}

const checkIfHeroExists = (id) => {
  let hero = getHeroById(id).result;
  return hero != null;
};