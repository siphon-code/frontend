import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },

]

export default farms
