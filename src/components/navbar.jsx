import React from 'react'
import { Button, Modal } from 'antd'
import Metamask from '../assets/metamask.png'
export default class Navbar extends React.Component{

    constructor(props){
        super(props)
        this.state={
            connecting : false,
            modal : false
        }
    }

    render(){
        const {connecting,modal} = this.state
        const {connected, address} = this.props
        return(
            <div className="navbar-wrapper">
              <div className="navbar container">
                <h1>ProofSys</h1>
                <div>
                    {
                    connected ? 
                    <div className="connected-card">
                        <img src="https://dynamic-assets.coinbase.com/4861e50787caa9405703c71e788467e8242f5d15a7a51335c299dc3e87a8d1d08bfd19ab67ad8bb2581b525af27c8dcbd0c78ede837eeaff75ae9b96716bf75e/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png" />
                        <p>{address.slice(0,10) + '..........' + address.slice(35,42)}</p>
                    </div>
                    :
                    <Button loading={connecting} type="primary" onClick={()=>{this.setState({modal : true})}}>
                        Connect Wallet
                    </Button>
                    }
                </div>
              </div>  
              <Modal title="Connect Wallet" visible={modal && !connected} footer={null} onCancel={()=>{this.setState({ modal : false })}}>
                <div className="connect-card" onClick={()=>{this.props.connect('metamask')}}>
                    <img src={Metamask} />
                    <h2>Metamask</h2>
                    <p>Connect to your metamask wallet</p>
                </div>
              </Modal>  
            </div>
        )
    }
}