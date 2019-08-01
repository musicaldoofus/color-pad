import React, { Component } from 'react';
// import Blob from './components/atoms/Blob';
import Palette from './components/organisms/Palette';
import Canvas from './components/molecules/Canvas';
import paletteTemplate from './helpers/paletteTemplate';
import './App.css';

const SubtleHeader = ({hex}) => (
	<div className="header subtle">
		<h6>Draw on me!</h6>
		<p>{hex}</p>
	</div>
);

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
				blobs: [],
				stroke: 5,
				colorFocus: paletteTemplate[0]
			};
		this.addBlobTo = this.addBlobTo.bind(this);
		this.handleCanvasClick = this.handleCanvasClick.bind(this);
		this.handleColorUpdate = this.handleColorUpdate.bind(this);
		this.handleStrokeUpdate = this.handleStrokeUpdate.bind(this);
	}

	addBlobTo(e) {
		this.setState({
			blobs: this.state.blobs.concat({x: e.clientX, y: e.clientY})
		});
	}
	
	handleStrokeUpdate(e) {
		// console.log(e);
	}
	
	handleColorUpdate(c) {
		this.setState({colorFocus: c});
	}
	
	handleCanvasClick(e) {
		console.log('handleCanvasClick', e);
	}

	render() {
		// const blobs = this.state.blobs.map((b) => toBlob(b, this.state.size));
		return (
			<div className="container">
				<SubtleHeader hex={this.state.colorFocus.hex}/>
				<Palette
					onClick={this.handleColorUpdate}
					handleStrokeUpdate={this.handleStrokeUpdate}
				/>
				<Canvas
					color={this.state.colorFocus}
					stroke={this.state.stroke}
				/>
			</div>
		)
	}
}

export default App;