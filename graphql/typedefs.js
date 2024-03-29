const gql = require('graphql-tag')

const typeDefs = gql`
  type Query {
    lastUpdate(apt_nm_cd: String): [Apartment]

    apartmentByAptNum(apt_nm_cd: String!, apt_num: String): [Apartment]

    countGroupByAptSize(apt_nm_cd: String): [Vita_Apt_Num_Count]

    countGroupByVitaAptNum: [Vita_Apt_Num_Count]

    averagePrice(apt_nm_cd: String): [AveragePrice]

    daysStale(apt_nm_cd: String): [DaysStale]

    totalCount(apt_nm_cd: String): TotalCount
  }

  type Apartment {
    id: ID
    apt_nm_cd: String
    apt_num: String
    apt_type: String
    apt_size: String
    apt_price: String
    apt_avl_dt: String
    cret_ts: String
    updt_ts: String
  }

  type Vita_Apt_Num_Count {
    right: String
    apt_size: String
    apt_type: String
    count: Int
  }

  type AveragePrice {
    avg: Float
    right: String
    count: Int
    apt_size: String
    apt_type: String
  }

  type DaysStale {
    count: Int
    days_stale: Int
  }

  type TotalCount {
    count: Int
  }
`

module.exports = typeDefs
