const {ethers} = require("hardhat")
const {expect, assert} = require("chai")


describe("SimpleStorage", () => {

  let simpleStorageFactory, simpleStorage

  beforeEach(async function() {
     simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
     simpleStorage = await simpleStorageFactory.deploy()
  })
  
  it("Should start with a favorite number of 0", async function() {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"


    assert.equal(currentValue.toString(), expectedValue)
    expect(currentValue.toString()).to.equal(expectedValue)
    // this both upper two line are work same it's totaly up to us which we are use 
  })

  it("Should update when we call store",  async function () {
    const expectedValue = "7"
    const transactionReaponse  = await simpleStorage.store(7)
    const updateValue  = await simpleStorage.retrieve()
    
    assert.equal(updateValue.toString(), expectedValue);

  })
})