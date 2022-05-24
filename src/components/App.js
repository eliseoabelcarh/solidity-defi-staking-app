import React, { Component } from 'react'
import Navbars from './Navbar'
import Web3 from 'web3'

export default class App extends Component {

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }else if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            window.alert('no ethereum browser detected, check out metamask ')
        }
    }
    async loadBlockchainData(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
    }

    constructor(props){
        super(props)
        this.state = {
            account:'0x0'
        }
    }

  render() {
    return (
      <div>
          <Navbars account={this.state.account}/>
      </div>
    )
  }
}
