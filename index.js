const Web3 = require("web3")
const ContractKit = require("@celo/contractkit")

const DEFAULT_TESTNET = "integration"
// 'alfajores', 'baklava' 'integration'

const provider = new Web3.providers.HttpProvider(
  `https://${DEFAULT_TESTNET}-forno.celo-testnet.org`
)
const web3 = new Web3(provider)
const contractKit = ContractKit.newKitFromWeb3(web3)

web3.eth
  .getTransactionReceipt("0x5b746527b888fb0567fb37d5a73a1894c2c3036deb31adebeb162d6691cf025f")
  .then(console.log)

// Wei conversion when necessary
contractKit.contracts.getExchange().then(exchangeContract => {
  exchangeContract.getExchangeRate(web3.utils.toWei("1000"), true).then(rate => {
    console.log(rate.toString())
  })
})

contractKit.contracts.getAccounts().then(accounts => {
  accounts.getDataEncryptionKey("0xce10ce10ce10ce10ce10ce10ce10ce10ce10ce10").then(rate => {
    console.log(rate)
  })
})

contractKit.web3.eth.getBalance("0x9f2abD7DdCf7d4D1d988f92a6C546B89684262fc").then(bal => {
  console.log(bal.toString())
})

contractKit._web3Contracts.getReserve().then(reserve => {
  reserve.methods
    .getOrComputeTobinTax()
    .call()
    .then(rate => {
      console.log(rate)
    })
})
