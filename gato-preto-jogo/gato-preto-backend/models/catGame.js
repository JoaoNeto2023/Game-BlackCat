import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export const CatGame = sequelize.define('CatGame', {
  playerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blackCats: {
    type: DataTypes.TEXT, // JSON array
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('blackCats'));
    },
    set(value) {
      this.setDataValue('blackCats', JSON.stringify(value));
    }
  },
  guesses: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('guesses'));
    },
    set(value) {
      this.setDataValue('guesses', JSON.stringify(value));
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'em andamento'
  }
});
