import React, { Component } from 'react';
import paletteTemplate from '../../../helpers/paletteTemplate';
import './Palette.css';

class CodeContainer extends Component {
	// componentDidMount() {
		// console.log('<CodeContainer> componentDidMount');
	// }
	
	render() {
		const codeDisplay = 'd';
		return (
			<div className="code-container">
				{codeDisplay}
			</div>
		);
	}
}

const Toggle = ({type, onClick, label, children}) => (
	<div className={`btn ${type}`} onClick={onClick}>
		<p>{label ? label : children}</p>
	</div>
);

const Color = ({color, onClick}) => <div className="color-individual" style={{backgroundColor: `#${color.hex}`}} onClick={() => onClick(color)}></div>;

const ColorContainer = ({color, showCode, onClick}) => {
	const codeContainer = showCode ? <CodeContainer/> : null;
	return (
		<div className="color-container">
			<Color {...color} onClick={onClick}/>
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
	
	// handleInput(cInd) {
		
	// }
	
	handleSelectColor(c) {
		this.props.onClick(c);
	}
	
	render() {
		const colorContainers = this.state.colorContainers.map(this.toColorContainer);
		return (
			<div className="palette">
				<div className="palette-header">
					<div>
						<h1>Pick it!</h1>
					</div>
					<div id="palette-button-container">
						<Toggle type="radio" label="show codes"/>
						{this.state.showCode && <Toggle type="radio-slide"></Toggle>}
					</div>
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