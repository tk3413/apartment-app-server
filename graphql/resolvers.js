const apartments = require('../models').apartment
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = resolvers = {
  Query: {
    async apartmentByAptNum (obj, args, context, info) {
      return await apartments.gqlFindByAptNum(args.apt_num)
    },

    async countGroupByAptSize (obj, args, context, info) {
      return apartments
        .count({
          group: ['apt_size']
        })
        .then(count => {
          console.log(count)
          return count
        })
    },

    async countGroupByVitaAptNum (obj, args, context, info) {
      return apartments
        .count({
          group: [Sequelize.fn('RIGHT', Sequelize.col('apt_num'), 2)]
        })
        .then(count => {
          console.log(count)
          return count
        })
    },

    async averagePrice (obj, args, context, info) {
      return apartments.count({
        attributes: [
          Sequelize.fn('AVG', Sequelize.col('apt_prices')),
          Sequelize.fn('RIGHT', Sequelize.col('apt_num'), 2),
          'apt_size',
          'apt_type'
        ],
        where: {
          [Op.and]: [
            { apt_nm_cd: { [Op.eq]: args.apt_nm_cd } },
            { apt_prices: { [Op.gt]: 1 } }
          ]
        },
        group: ['apt_size', 'apt_type', Sequelize.fn('RIGHT', Sequelize.col('apt_num'), 2)]
      })
    }
  }
}
