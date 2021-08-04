import React from 'react'
import { Input, Button, notification, Radio } from 'antd'
import ipfs from '../utils/ipfs'
import { BEP721, BEP721ABI, BEP1155, BEP1155ABI } from '../utils/contracts'
const ethers = require('ethers')
export default class Home extends React.Component{

    constructor(props){
        super(props)
        this.state={
          creating : false,
          buffer : null,
          uploaded : false,
          uploading : false,
          hash : '',
          name : '',
          description : '',
          type : '1',
          supply : '',
          additional : 'No Additional Info'
        }
        this.captureFile = this.captureFile.bind(this);
    }

    upload = () => {
        notification.info({message : 'Uploading Started to ProofStorage'})
        this.setState({uploading : true}, async () => {
            try{
             let result = await ipfs.files.add(this.state.buffer)
             this.setState({uploading : false, uploaded : true, hash : result[0].hash})
             notification.success({message : 'Successfully uploaded files to ProofStorage'})
            } catch(e){
                console.log(e)
                notification.error("Error Uploading Files to ProofStorage")
            }
        })
    }

    captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          this.upload()
        }
    }

    create = () => {
        const {type} = this.state
        if(type === '1'){
            this.bep721()
        }
        else {
            this.bep1155()
        }
    }

    bep1155 = async () => {
        this.setState({creating : true})
        const {connected, signer} = this.props
        const {name, description, hash, uploaded, supply, additional} = this.state
        if(connected && uploaded && name && description && additional){
            try{
            let contract = new ethers.Contract(BEP1155,BEP1155ABI,signer)
            let tx = await contract["mint(uint256,string,string,string,string)"](supply,`${name}`,`${description}`,`${hash}`,`${additional}`);
            if(tx){
                notification.success({
                    message : 'Successfully Minted New NFT',
                    description : `Your NFT is minted at transaction with hash ${tx.hash}`
                })
                this.setState({creating : false, uploaded : false, name : '', description : '', hash : '', additional : '', buffer : null})
            }
            } catch(e){
                console.log(e)
                notification.error({
                    message : 'Error minting NFT'
                })
                this.setState({creating : false})
            }
        }
        else {
            notification.info({message :  !connected ? "Please connect your wallet to mint an NFT" : !name ? "Please enter the name of your NFT" : !description ? "Please enter description for your NFT" : !hash ? "Upload a Logo image for your NFT" : "Add Additional Information or add empty info."})
            this.setState({creating : false})
        }
    }

    bep721 = async () => {
        this.setState({creating : true})
        const {connected, signer} = this.props
        const {name, description, hash, uploaded, additional} = this.state
        if(connected && uploaded && name && description && additional){
            try{
            let contract = new ethers.Contract(BEP721,BEP721ABI,signer)
            let tokenId = await contract.totalSupply()
                tokenId = tokenId.toNumber() + 1
                tokenId = ethers.utils.parseUnits(String(tokenId),0)
            let tx = await contract["mint(uint256,string,string,string,string)"](tokenId ,`${name}`,`${description}`,`${hash}`,`${additional}`);
            if(tx){
                notification.success({
                    message : 'Successfully Minted New NFT',
                    description : `Your NFT with tokenId ${tokenId} is minted at transaction with hash ${tx.hash}`
                })
                this.setState({creating : false, uploaded : false, name : '', description : '', hash : '', buffer : null, additional : ''})
            }
            } catch(e){
                console.log(e)
                notification.error({
                    message : 'Error minting NFT'
                })
                this.setState({creating : false})
            }
        }
        else {
            notification.info({message :  !connected ? "Please connect your wallet to mint an NFT" : !name ? "Please enter the name of your NFT" : !description ? "Please enter description for your NFT" : !hash ? "Upload a Logo image for your NFT" : "Add Additional Information or add empty info."})
            this.setState({creating : false})
        }
    }

    render(){
        const {creating, type} = this.state
        return(
            <div className="home-wrapper">
             <div className="container home-container">
                <div className="home-card">
                    <img src="/logo512.png" height="80px" width="300px"/>
                    <br/>
                    <div className="creation-form">
                    
                    <p>We considered use cases of NFTs being owned and transacted by individuals as well as consignment to third party brokers/wallets/auctioneers (“operators”). NFTs can represent ownership over digital or physical assets. We considered a diverse universe of assets, and we know you will dream up many more:</p>
                        <ul>Physical property — houses, unique artwork</ul>
                        <ul>Virtual collectables — unique pictures of kittens, collectable cards</ul>
                        <ul>“Negative value” assets — loans, burdens and other responsibilities</ul>
                    <p>In general, all houses are distinct and no two kittens are alike. NFTs are distinguishable and you must track the ownership of each one separately.</p>
                     <div>
                      <Radio.Group style={{marginTop : '1rem'}} onChange={(e)=>{this.setState({type : e.target.value})}} value={type}>
                        <Radio value="1"> BEP721 </Radio>
                        <Radio value="2"> BEP1155 </Radio>
                      </Radio.Group>  
                      </div>
                      <div>
                        <label>Name of NFT</label>
                        <Input style={{marginTop:'0.5rem'}} onChange={(e)=>{this.setState({ name : e.target.value})}} value={this.state.name} />
                      </div>
                      <div>
                        <label>Description of NFT</label>
                        <Input style={{marginTop:'0.5rem'}} onChange={(e)=>{this.setState({ description : e.target.value })}} value={this.state.description} />
                      </div>
                      {
                        type === '2' ?
                        <div>
                            <label>Total Supply</label>
                            <Input style={{marginTop:'0.5rem'}} onChange={(e)=>{this.setState({ supply : e.target.value })}} value={this.state.supply} />
                        </div>
                        :
                        null
                      }
                      <div>
                          <label>Digital Asset</label>
                          <Input 
                            style={{marginTop:'0.5rem'}} 
                            type='file' 
                            onChange={this.captureFile} 
                            accept=".png,.jpeg,.jpg,.zip"
                            id="fileupload"
                            />
                          <p>
                           {
                            this.state.uploaded ? 
                            <span>
                                Successfully Uploaded to IPFS. <a href={`https://ipfs.io/ipfs/${this.state.hash}`} target="_blank">View On IPFS</a>
                            </span>
                            :
                            this.state.uploading ? "Uploading Files to IPFS ...."
                            :
                            null
                           }
                          </p>
                      </div>
                      <div>
                        <label>Additional Info</label>
                        <Input style={{marginTop:'0.5rem'}} onChange={(e)=>{this.setState({ additional : e.target.value })}} value={this.state.additional} />
                      </div>
                    </div>
                    <Button loading={creating} style={{marginTop : '2rem'}} type="primary" onClick={()=>{this.create()}}>
                        Create NFT
                    </Button>
                </div>
             </div>
            </div>
        )
    }
}