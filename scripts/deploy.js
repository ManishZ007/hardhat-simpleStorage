const  {ethers, network, run} = require("hardhat")
require("dotenv").config()


async function main() {
    const ContractFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Contract Deploying.....")
    const simpleStorage = ContractFactory.deploy()
    const address =  (await simpleStorage).target
    console.log(`Contract address ${address}`)

    if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        (await simpleStorage).deploymentTransaction().wait(6)
        await verify(address, [])

    }

    const currentValue =  await (await simpleStorage).retrieve()
    console.log(`${currentValue}`)


    //update retrieve
    const transactionResponse = await (await simpleStorage).store(7);
    await (await transactionResponse).wait(1);
    const updateValue = await (await simpleStorage).retrieve()
    console.log(`update value is ${updateValue}`)
    
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if(error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        }else{
            console.log(error)
        }
    }
}



main().then(() => {
    process.exit(0)
}).catch((err) => {
    console.log(err.message)
    process.exit(1)
})