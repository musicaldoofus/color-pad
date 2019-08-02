import React, { Component } from 'react';
import Palette from './components/organisms/Palette';
import Canvas from './components/molecules/Canvas';
import paletteTemplate from './helpers/paletteTemplate';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stroke: 16,
			colorFocus: paletteTemplate[0].color
		};
		this.handleColorUpdate = this.handleColorUpdate.bind(this);
		this.handleStrokeUpdate = this.handleStrokeUpdate.bind(this);
	}
	
	handleStrokeUpdate({target}) {
		this.setState({stroke: target.value});
	}
	
	handleColorUpdate(c) {
		this.setState({colorFocus: c});
	}
	
	render() {
		return (
			<div className="container">
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