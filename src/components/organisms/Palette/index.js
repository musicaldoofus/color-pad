import React, { Component } from 'react';
import paletteTemplate from '../../../helpers/paletteTemplate';
import './Palette.css';

class CodeContainer extends Component {
	render() {
		const codeDisplay = 'd';
		return (
			<div className="code-container">
				{codeDisplay}
			</div>
		);
	}
}

const ColorContainer = ({color, showCode, onClick}) => {
	const codeContainer = showCode ? <CodeContainer/> : null;
	const c = color.color; //fix
	return (
		<div className="color-container">
			<div
				className="color-individual"
				style={{backgroundColor: `#${c.hex}`}}
				onClick={() => onClick(c)}
			></div>
			{codeContainer}
		</div>
	);
}

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colorContainers: paletteTemplate,
			code: null
		};
		this.toColorContainer = this.toColorContainer.bind(this);
		// this.handleInput = this.handleInput.bind(this);
		this.handleSelectColor = this.handleSelectColor.bind(this);
		this.handleStrokeUpdate = this.handleStrokeUpdate.bind(this);
	}
	
	handleShowCodeUpdate(code) {
		if (!code) this.setState({showCode: null});
		else this.setState({showCode: code});
	}
	
	handleStrokeUpdate(s) {
		this.props.handleStrokeUpdate(s);
	}
	
	toColorContainer(c) {
		return <ColorContainer
			key={c.id} {...c}
			color={c}
			showCode={this.state.code}
			onClick={this.handleSelectColor}
		/>;
	}
	
	handleSelectColor(c) {
		this.props.onClick(c);
	}
	
	render() {
		const colorContainers = this.state.colorContainers.map(this.toColorContainer);
		return (
			<div className="palette">
				<div className="palette-header">
					<div>
						<h1>Pick a color!</h1>
					</div>
					<div id="palette-button-container">
						<button onClick={() => this.handleShowCodeUpdate()}>no code</button>
						<button onClick={() => this.handleShowCodeUpdate('hex')}>#hex</button>
						<button onClick={() => this.handleShowCodeUpdate('hex')}>rgb()</button>
					</div>
				</div>
				<div className="palette-size-buttons">
					<input defaultValue="16" type="range" min="4" max="64" step="4" onChange={this.handleStrokeUpdate}/>
				</div>
				<div className="palette-colors">
					<div className="color-containers">
						{colorContainers}
					</div>
				</div>
			</div>
		);
	}
}

export default Palette;