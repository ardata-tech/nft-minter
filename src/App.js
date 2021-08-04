import React from 'react'
import Navbar from './components/navbar'
import Home from './components/home'
import Owned from './components/owned'
import {notification} from 'antd'
import 'antd/dist/antd.css'
const ethers = require('ethers')

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      signer : null,
      connected : false,
      address : ''
    }
    this.connect = this.connect.bind(this)
    this.metamask = this.metamask.bind(this)
  }

  componentDidMount = () => {
    try{
      if(typeof window.ethereum !== undefined || typeof window.ethereum !== null){
       window.ethereum.on('accountsChanged', () => {
         if(this.state.connected){
         notification['warning']({
         message : 'Account Change Detected In Metamask. Please re-connect your wallet.'
         })
         this.setState({
           connected : false,
           signer : null,
           address : ''
         })
       }
     })
 
     window.ethereum.on('networkChanged', () => {
       notification['info']({
         message : 'Network Change Detected In Metamask. Please ensure you are connected to BSC Testnet.'
       })
       this.setState({
         connected : false,
         signer : null,
         address : ''
       })
     })
     }
    } catch(e) {
      console.log(e)
    }
  }

  connect = (type) => {
    if(type == 'metamask'){
      this.metamask()
    }
  }

  metamask = async () => {
    try{
			if(window.ethereum === undefined || window.ethereum === null){
        notification.error({
          message : 'No Metamask Found',
          description : 'For using this application, you need to install metamask in your browser.'
        })
      }
      else{
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.enable();
				const address = await provider.listAccounts();
				let network = await provider.getNetwork()
				if(network.chainId !== 97){
					notification['error']({
						message : 'Wrong Network Detected. Please connect to Binance Test Smart Chain'
					})
					this.setState({connectWalletModalVisible : false})
				}
				else{
				let signer = await provider.getSigner();
				this.setState({connected : true, address : address[0],signer : signer})
			}
     }
		}
		catch(e){
			console.log(e)
		}
  }
  
  render(){
  const { signer, connected, address } = this.state
  return (
    <div>
      <Navbar
        signer = {signer}
        connected = {connected}
        address = {address}
        connect = {this.connect}
        />
      <Home 
        signer = {signer}
        connected = {connected}
        address = {address}
        />
      <Owned 
        signer = {signer}
        connected = {connected}
        address = {address}
      />
    </div>  
  );
 }
}
