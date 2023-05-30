import React from "react";
import web3context from "./web3context";
import { useState } from "react";
import loadProvider from '../Connection';
import contract from "../contracts/Dtv.json"
import { useNavigate } from "react-router-dom";
import dotenv from 'dotenv'
dotenv.config()

const Web3state = (props) => {
    const navigate= useNavigate()
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const [connection, setConnection] = useState(false)
    const [address, setaddress] = useState("")
    const [login, setlogin] = useState("")
    const [web3API, setWeb3API] = useState({
        web3: null,
        contract: null
    })

    const connect = async () => {
        const web3 = await loadProvider();
        try {
            const instance = new web3.eth.Contract(contract.abi, contractAddress);
            setWeb3API({
                web3,
                contract: instance
            })
            setConnection(true)
        } catch (error) {
            console.log(error)
            navigate('/error')
        }
    }

    const getData = async () => {
        const data = await web3API.contract.methods.getAllVideos().call();
        return data;
    }

    const pushVideo = async (_videoHash, _title, _description, _tag) => {
        const addresses = await web3API.web3.eth.getAccounts();
        const address = addresses[0];
        await web3API.contract.methods.uploadVideo(_videoHash, _title, _description, _tag).send({ from: address })
    }

    const reward = async (_address) => {
        const addresses = await web3API.web3.eth.getAccounts();
        const address = addresses[0];
        await web3API.contract.methods.enter().send({ from: address, value: 2 * 10 ** 18, to: contractAddress });
        await web3API.contract.methods.transfer(_address).send({ from: address });
    }

    const getCategoryData = async (_tag) => {
        const data = await web3API.contract.methods.videoByTag(_tag).call();
        return data;
    }

    const getMyData = async () => {
        const addresses = await web3API.web3.eth.getAccounts();
        setaddress(addresses[0]);
        const data = await web3API.contract.methods.getUserVideos(addresses[0]).call();
        return data;
    }

    const getUserData = async (_address) => {
        const data = await web3API.contract.methods.getUserVideos(_address).call();
        return data;
    }


    return (
        <web3context.Provider value={{ connection, connect, getData, getUserData,getMyData, pushVideo, reward, getCategoryData ,address}}>
            {props.children}
        </web3context.Provider>
    )
}

export default Web3state