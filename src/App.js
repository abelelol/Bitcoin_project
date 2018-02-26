import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//this is a comment
const btcs = new WebSocket("wss://ws.blockchain.info/inv");

btcs.onopen = function(){
	btcs.send(JSON.stringify({"op":"addr_unsub", "addr":"1N6d7Y6qMtr1B3NRCk3Ge2CDBgf4iLfzJR"}));
};

btcs.onmessage = function(onmsg){
	var response = JSON.parse(onmsg.data);
	var getOuts = response.x.out;
	var countOuts = getOuts.length;
	var i;
	for(i=0; i<countOuts; i++){
		var outAdd = response.x.out[i].addr;
		var address = "1N6d7Y6qMtr1B3NRCk3Ge2CDBgf4iLfzJR";
		if(outAdd === address){
			var amount = response.x.out[i].value;
			var calAmount = amount / 100000000;
			document.getElementById("websocket").innerHTML = "Recieved:" + calAmount + "BTC";
		}if(outAdd === null){
				document.getElementById("websocket").innerHTML = "Recieved:BTC";
		};
	};
};

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BlockChain App</h1>

        </header>
        <p className="App-intro">
        </p>
		<p id="websocket">This is a test</p>
      </div>

    );
  }
}

export default App;
