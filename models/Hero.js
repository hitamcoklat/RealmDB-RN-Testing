export default class Hero {
  constructor(id = 1, heroName = '') {
    this.id = id;
    this.heroName = heroName;
  }

  getRealmObject() {
    return {
      id: this.id,
      heroName: this.heroName,
    };
  }
}

const HeroSchema = {
  name: 'Hero',
  properties: {
    id: 'int',
    heroName: 'string',
  },
};

Hero.schema = HeroSchema;
