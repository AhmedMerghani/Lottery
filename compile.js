const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'], 
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const lotteryContract = output.contracts['Lottery.sol']['Lottery'];
const contractData = {
    abi: lotteryContract.abi,
    bytecode: lotteryContract.evm.bytecode.object
};

module.exports = contractData;