const Web3 = require('web3');
const Marketplace = require('../../../contracts/MarketPlace.json');
const IERC20 = require('../../../contracts/IERC20.json')
const main=async()=>{
    // if (window.ethereum != undefined){
    //     web3 = new Web3(window.ethereum);
    //     await window.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
    //         console.log(result[0]);
    //         // window.localStorage.account=result[0];
    //     })
    // }else if(window.web3){
    //     web3 = new Web3(window.web3.currentProvider);
    // }else{
    //     web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WSS_RINKEBY));
    //     console.log('connect to wss rinkeby')
    // }

    web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/5980ac9a76974211b543ee63a2b5ac83'));
    console.log('connect to wss rinkeby')
    signer = web3.eth.accounts.wallet.add("0xf11a794b1b8cbc8967f545ea3f3775f5254f061e40eadf6a64641ae2634234e1");
    contract = await new web3.eth.Contract(Marketplace.abi, '0x11BE658bC506C807779e81C54E49aef0BE472f73');
    // await createNewProduct("QmXpDK3D98viywxXQdPmJZLrGGxHEb7SrUNep6eGrMmktb", "100000000000000000", signer.address)
    await contract.methods.getProductListCreated("0xaFc15374b980F7aeb7f63123E94aee915d11F81D").call().then(data=>{
        if (data)
            console.log(data)
        else console.log("Hello worlddxfghjkl")
    })
    console.log(contract.options.address)
}
main()

// if you send gas = null, it tells metamask you don't know what the gas should be
// and metamask will provide a gas price for you.
// author: Long

const createNewProduct = async( _hash, _price, _performerAddr)=>{
    const object = await contract.methods.createNewProduct(_hash, _price).send({
        from: _performerAddr
    })
    .on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", async(receipt) => {
            console.log("receipt: " + receipt);
            await art.methods.approve(contract.options.address, _tokenId).send({
                from: _performerAddr,
                gas: 5500000
            });
        })
        .on("error", console.error);
    return object;
}

const setListOrNot = async(_tokenId, _performerAddr) =>{
    const object = await contract.methods.setListOrNot(_tokenId).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);
    return object;
}

const setSellOrNot = async(_tokenId, _performerAddr) =>{
    const object = await contract.methods.setSellOrNot(_tokenId).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);
    return object;
}

const setPrice= async(_tokenId, _price, _performerAddr) =>{
    const object = await contract.methods.setPrice(_tokenId, _price).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);

        
    return object;
}

const getProductListCreated= async(_user, _performerAddr) =>{
    const object = await contract.methods.getProductListCreated(_user).call()
    return object;
}

const buy= async(_tokenId, _performerAddr) =>{
    const object = await contract.methods.buy(_tokenId).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);
    return object;
}

const getProducListOwnable= async(_owner, _performerAddr) =>{
    const object = await contract.methods.getProducListOwnable(_owner).call()
    return object;
}

const offer= async(_tokenId, _amount, _token20, _timeout , _performerAddr) =>{
    await web3.eth.Contract(IERC20.abi, _token20).approve(contract.options.address, _amount);
    const object = await contract.methods.offer(_tokenId, _amount, _token20, _timeout).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);
    return object;
}

const getOffer= async(_tokenId, _index , _performerAddr) =>{
    const object = await contract.methods.getOffer(_tokenId, _index).call()
    return object;
}

const approveOffer= async( _tokenId,_index, _performerAddr) =>{
    //approve token721
    const object = await contract.methods.approveOffer(_tokenId,_index).send({
        from: _performerAddr
    }).on("transactionHash", hash => {
            console.log("Transaction hash: " + hash);
        })
        .on("receipt", receipt => {
            console.log("receipt: " + receipt);
        })
        .on("error", console.error);
    return object;
}

const makeTransactSignature=async(_tokenId, _amount, _token20, _bargainer, _timeout)=>{
    throw 'function not ready';
    const hex = "0x" + ethereumjs.ABI.soliditySHA3(
        ["uint256", "uint256", "address", "uint256"], // missing: _token20
        [_tokenId, _amount, web3.eth.defaultAccount, _timeout]
      ).toString("hex");
    return await web3.eth.sign(hex);
}