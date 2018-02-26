import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search.js';
import axios from 'axios'

//this is a comment



class App extends Component {

  constructor(props){
	  super(props)
	  this.state = {
		  balance: 0,
		  btcAddress: "1N6d7Y6qMtr1B3NRCk3Ge2CDBgf4iLfzJR",
		  changed: false
	  }

	  this.getBalance = this.getBalance.bind(this)
	  this.updateBalance = this.updateBalance.bind(this)
	  this.connectToWallet = this.connectToWallet.bind(this)
	  this.handleChange = this.handleChange.bind(this)
	  this.handleSubmit = this.handleSubmit.bind(this)

  }

   componentDidMount(){

	   this.setState({
		   btcs: this.connectToWallet(this.state.btcAddress)
	   })

  }

   handleChange(event) {
     this.setState({btcAddress: event.target.value })
   }

   handleSubmit(event) {
    event.preventDefault()
	this.setState({
		btcs: this.connectToWallet(this.state.btcAddress),
		changed: true
	})

  }

  updateBalance(amount){
 	this.setState(
		  {
			  balance: amount/100000000
		  }
	  )
  }

  getBalance(address){
	  let amount = 0
	  axios.get('https://blockchain.info/q/addressbalance/'+this.state.btcAddress)
	  		.then((response) =>{
				this.updateBalance(response.data)
			})
			.catch(function(error){
				console.log(error)
			})
  }

  connectToWallet(address){
	  const btcs = new WebSocket("wss://ws.blockchain.info/inv");

	  btcs.onopen = function(){
	  	btcs.send(JSON.stringify({"op":"addr_unsub", "addr": address}));
	  };

	  btcs.onmessage = function(onmsg){
	  	var response = JSON.parse(onmsg.data);
	  	var getOuts = response.x.out;
	  	var countOuts = getOuts.length;
	  	var i;
	  	for(i=0; i<countOuts; i++){
	  		var outAdd = response.x.out[i].addr;
	  		if(outAdd === this.state.btcAddress){
	  			var amount = response.x.out[i].value;
	  			this.updateBalance(amount)
	  		};
	    };
	}

	this.getBalance(address)
	return btcs

  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BlockChain App</h1>

        </header>
		<Search
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			/>
        <p className="App-intro">
		<p>
			Bitcoin Wallet Address: {this.state.btcAddress}
			<br />
            Balance: {this.state.balance} BTC
			<br />
			changed: {"" + this.state.changed}
		</p>
		</p>
		<p id="websocket">
		{
			this.state.balance === 0 ?
				"Recieved:BTC":
				"Recieve" + this.state.balance + "BTC"
		}
		</p>
      </div>

    );
  }
}

export default App;
