import React, { Component } from "react";
import Navbars from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Spinner from "react-bootstrap/Spinner";
import Main from "../components/Main";

export default class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  activarLoadingSpinner = (value) => this.setState({loading:value})

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("no ethereum browser detected, check out metamask ");
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log(networkId, "neteworkddiiiddd");

    //load tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      console.log("tetherrrrsdataa ", tetherData);
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      console.log("TETHERRRRRR ", tether);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      console.log({ balance: tetherBalance });
    } else {
      alert("Error: Tether contract not deployed - not detected network");
    }

    //load rwd contract
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
      console.log("balance de rwd ", rwdBalance);
    } else {
      alert("Error: RWD contract not deployed - not detected network");
    }
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank });
      console.log("deentralBank OBJECT ", decentralBank);
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      console.log("stakingBalance ", stakingBalance);
      this.setState({ stakingBalance: stakingBalance.toString() });
      //console.log('decentralbankk ',decentralBank)
    } else {
      alert(
        "Error: DecentralBank contract not deployed - not detected network"
      );
    }

    this.activarLoadingSpinner(false)
  }

  
  
  //staking function
  stakeTokens = (amount) => {
    this.activarLoadingSpinner(true)
    this.state.tether.methods.approve(this.state.decentralBank._address,amount).send({from:this.state.account}).on('transactionHash', (hash)=>{
        this.state.decentralBank.methods.depositTokens(amount).send({from:this.state.account}).on('transactionHash', (hash)=>{
            this.activarLoadingSpinner(false)
        })
    })
  }

/* 
  stakeTokens = (amount) => {
    this.activarLoadingSpinner(true)
    this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.activarLoadingSpinner(false)
      })
    }) 
  }
 */

  //unstake tokens

  unstakeTokens = () =>{
    this.activarLoadingSpinner(true)
    this.state.decentralBank.methods.unstakeTokens().send({from:this.state.account}).on('transactionHash', (hash)=>{
        this.activarLoadingSpinner(false)
    })

  }
  
  
  
  
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    const spinnerLoading = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spinner animation="grow" />
      </div>
    );
    const mainContent = (
      <Main
        tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens= {this.stakeTokens}
        unstakeTokens = {this.unstakeTokens}
      />
    );
    return (
      <div>
        <Navbars account={this.state.account} />
        {this.state.loading ? spinnerLoading : mainContent}
      </div>
    );
  }
}
