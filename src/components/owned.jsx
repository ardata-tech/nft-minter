import React from 'react';

import { Button, Tabs, Empty } from 'antd';

import {BEP1155, BEP1155ABI , BEP721, BEP721ABI, PROVIDER} from '../utils/contracts';

const ethers = require('ethers');

const { TabPane } = Tabs;

export default class Owned extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            bep721 : [],
            bep1155 : [],
            bep721loading : true,
            bep1155loading : true
        };
    }

    componentDidMount() {
        const { address } = this.props;
        if(address) {
            this.fetch();
        }
        else {
          this.setState({ bep721loading: false, bep1155loading: false })
        }
    }
    
    // componentDidUpdate() {
    //     const { address } = this.props;
    //     const { bep721, bep1155 } = this.state;
    //     if(address && bep721.length === 0 && bep1155.length === 0) {
    //         this.fetch()
    //     }
    // }

    fetch = async () => {
       const {address} = this.props;
       this.setState({bep721: [], bep1155: []})
       if(address) {
       this.setState({bep1155loading : true, bep721loading : true})
       this.fetch1()
       this.fetch2()
       }
    }

    fetch1 = async () => {
        const { address } = this.props;
        let contract = new ethers.Contract(BEP721, BEP721ABI, PROVIDER);
        let totalSupply = await contract.totalSupply()
        for(let i = 1; i <= totalSupply.toNumber(); i++){
            if(i == totalSupply.toNumber()){
                this.setState({bep721loading : false})
            }
            try {
            let owner = await contract.ownerOf(i);
            if(owner === address) {
                this.push1(i)
            } } catch (e) {
                console.log("ERROR", e, i)
            }
        }
    }

    fetch2 = async () => {
        const { address } = this.props;
        let contract = new ethers.Contract(BEP1155, BEP1155ABI, PROVIDER);
        let totalSupply = await contract.totalSupply()
        for(let i = 1; i <= totalSupply.toNumber(); i++){
            if(i == totalSupply.toNumber()){
                this.setState({bep1155loading : false})
            }
            try {
            let balance = await contract.balanceOf(address, i);
            if(balance > 0) {
                this.push2(i, balance)
            } } catch (e) {
                console.log("ERROR", e, i)
            }
        } 
    }

    push1 = async (id) => {
       let contract = new ethers.Contract(BEP721, BEP721ABI, PROVIDER);
       let data = await contract.tokenInfo(id);
       let json = {
           id : id,
           uri : data[0],
           name : data[1],
           description : data[2],
           info : data[3]
       };
       let bep721 = this.state.bep721;
       await bep721.push(json)
       await this.setState({bep721})
    }

    push2 = async (id, balance) => {
        let contract = new ethers.Contract(BEP1155, BEP1155ABI, PROVIDER);
        let data = await contract.info(id);
        let json = {
            id : id,
            uri : this.bin2string(data[2]),
            name : this.bin2string(data[1]),
            description : this.bin2string(data[0]),
            info : this.bin2string(data[3]),
            balance : balance.toNumber()
        };
        let bep1155 = this.state.bep1155;
        await bep1155.push(json)
        await this.setState({bep1155})
    }

    bin2string(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    render() {
        const { bep721, bep1155, bep721loading, bep1155loading } = this.state;
        console.log(bep1155)
        return (
        <div className="home-wrapper">
            <div className="container home-container">
            <div className="home-card">
            <div style={{display : 'flex', flexDirection : "row", alignItems : 'center', justifyContent : 'space-between', width : '100%', marginBottom : "2rem"}}>
                <h2>Your Ownerships</h2>
                <Button loading={bep721loading || bep1155loading} onClick = { ()=>{ this.fetch() }}>
                    Fetch Again
                </Button>
            </div>
            <Tabs defaultActiveKey="1" style={{width:"90%", overflow : 'scroll'}}>
                <TabPane tab="PFT 721 Tokens" key="1">
                {
                 bep721.length === 0 ?
                  <div style={{marginTop : "4rem", marginBottom: "4rem", display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                    <Empty description="No PFTs Owned" />
                  </div>
                  :
                  <table className="ownership-table">
                    <thead>
                      <tr>
                        <td> Token ID</td>
                        <td> Name </td>
                        <td> Description</td>
                        <td> URI</td>
                        <td> Additional Information</td>
                      </tr>
                    </thead>
                     <tbody>
                      {
                      bep721.map(data => (
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td>{data.uri}</td>
                          <td>{data.info}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                 }
                </TabPane>
                <TabPane tab="PFT 1155 Tokens" key="2">
                {
                 bep1155.length === 0 ?
                  <div style={{marginTop : "4rem", marginBottom: "4rem", display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                    <Empty description="No PFTs Owned" />
                  </div>
                :
                <table className="ownership-table">
                    <thead>
                      <tr>
                        <td> Token ID</td>
                        <td> Name </td>
                        <td> Description</td>
                        <td> Balance</td>
                        <td> URI</td>
                        <td> Additional Information</td>
                      </tr>
                    </thead>
                    <tbody>
                      {bep1155.map(data => (
                        <tr>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td>{data.balance}</td>
                          <td>{data.uri}</td>
                          <td>{data.info}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                 }
                </TabPane>
            </Tabs>
            </div>
            </div>
        </div>
        )
    }
}