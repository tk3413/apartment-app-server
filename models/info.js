module.exports = (sequelize, DataTypes) => {
  const info = sequelize.define('info', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    apt_nm_cd: {
      type: DataTypes.STRING,
      unique: true
    },
    apt_nm: DataTypes.STRING,
    website: DataTypes.STRING,
    phn_num: DataTypes.STRING,
    street_num: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state_cd: DataTypes.STRING,
    zip_cd: DataTypes.STRING,
  }, {freezeTableName: true});

  return info;
};