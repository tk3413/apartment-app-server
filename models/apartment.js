const Info = require('./info')

module.exports = (sequelize, DataTypes) => {
  const apartment = sequelize.define('apartment', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    apt_nm_cd:  {
      type: DataTypes.STRING,
      references: {
        model: Info,
        key: 'apt_nm_cd'
      }
    }, 
    apt_num:    DataTypes.STRING,
    apt_type:   DataTypes.STRING,
    apt_size:   DataTypes.STRING,
    apt_price:  DataTypes.STRING,
    apt_avl_dt: DataTypes.DATE,
    cret_ts:    DataTypes.DATE,
    updt_ts:    DataTypes.DATE
  }, {
  });
  
  return apartment;
};