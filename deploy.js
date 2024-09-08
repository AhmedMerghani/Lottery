const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');

const provider = new HDWalletProvider('canoe guard ensure sentence duck more dose west pair anger cause pet',
    'https://eth-sepolia.g.alchemy.com/v2/tUCUOirXmytmdp664FyHOcCS_ZSQekYB');
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to use account ', accounts[0]);

    const fixedGasLimit = 2000000;
    const maxPriorityFeePerGas = await web3.eth.getGasPrice();
    const maxFeePerGas = parseInt(maxPriorityFeePerGas, 10) + 1000000000;

    try{
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({
            gas: fixedGasLimit,
            maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
            maxFeePerGas: maxFeePerGas.toString(),
            from: accounts[0]
        });
        console.log('Contract deployed to', result.options.address);
    }
    catch (error) {
        console.log('Error deploying contract:', error.message);
    }
};
deploy();