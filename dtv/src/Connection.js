import Web3 from 'web3';
const loadProvider = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return web3;
    } catch (error) {
      console.log("object",error)
    }
  }
  else if (window.web3) {
    const provider = await window.web3.currentProvider();
    const web3 = new Web3(provider);
    return web3;
  }

  else {
    const provider = new Web3.providers.HttpProvider("http://localhost:7545");
    const web3 = new Web3(provider);
    return web3;
  }
}


export default loadProvider