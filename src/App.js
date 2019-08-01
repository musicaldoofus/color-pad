import React, { Component } from 'react';
// import Blob from './components/atoms/Blob';
import Palette from './components/organisms/Palette';
import Canvas from './components/molecules/Canvas';
import paletteTemplate from './helpers/paletteTemplate';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
				blobs: [],
				size: 20,
				colorFocus: paletteTemplate[0]
			};
		this.addBlobTo = this.addBlobTo.bind(this);
		this.handleCanvasClick = this.handleCanvasClick.bind(this);
	}

	addBlobTo(e) {
		this.setState({
			blobs: this.state.blobs.concat({x: e.clientX, y: e.clientY})
		});
	}
	
	handleColorUpdate(c) {
		this.setState({colorFocus: c});
	}
	
	handleCanvasClick(e) {
		console.log('handleCanvasClick');
	}

	render() {
		// const blobs = this.state.blobs.map((b) => toBlob(b, this.state.size));
		return (
			<div className="container">
				<Palette onClick={this.handleColorUpdate}/>
				<Canvas onClick={this.handleCanvasClick}/>
			</div>
		)
	}
}

export default App;