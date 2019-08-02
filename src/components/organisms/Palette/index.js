import React, { Component } from 'react';
import paletteTemplate from '../../../helpers/paletteTemplate';
import './Palette.css';
import './Slider.css';

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
				className="color-individual btn"
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
			code: null,
			inputClassName: null
		};
		this.toColorContainer = this.toColorContainer.bind(this);
		// this.handleInput = this.handleInput.bind(this);
		this.handleSelectColor = this.handleSelectColor.bind(this);
		this.handleStrokeUpdate = this.handleStrokeUpdate.bind(this);
		this.getClassFrom = this.getClassFrom.bind(this);
		this.inputRef = React.createRef();
	}
	
	componentDidMount() {
		this.setState({inputClassName: this.getClassFrom(this.inputRef.current.value)});
	}
	
	getClassFrom(stroke) {
		const vals = {
			'100': 'one-hundred',
			'93': 'ninety-three',
			'87': 'eighty-seven',
			'81': 'eighty-one',
			'75': 'seventy-five',
			'68': 'sixty-eight',
			'62': 'sixty-two',
			'56': 'fifty-six',
			'50': 'fifty',
			'43': 'fourty-three',
			'37': 'thirty-seven',
			'31': 'thirty-one',
			'25': 'twenty-five',
			'18': 'eighteen',
			'12': 'twelve',
			'6': 'six'
		};
		return vals[Math.floor(stroke/64 * 100).toString(10)];
	}
	
	handleShowCodeUpdate(code) {
		if (!code) this.setState({showCode: null});
		else this.setState({showCode: code});
	}
	
	handleStrokeUpdate(s) {
		this.setState({inputClassName: this.getClassFrom(s.target.value)});
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
		const inputClassName = 'input' + (this.state.inputClassName ? ' ' + this.state.inputClassName : '');
		return (
			<div className="palette">
				<div className="palette-header">
					<div id="palette-button-container">
						<button className={`btn${!this.state.showCode ? ' active' : ''}`} onClick={() => this.handleShowCodeUpdate()}>compact</button>
						<button className={`btn${this.state.showCode === 'hex' ? ' active' : ''}`} onClick={() => this.handleShowCodeUpdate('hex')}>#hex</button>
						<button className={`btn${this.state.showCode === 'rgb' ? ' active' : ''}`} onClick={() => this.handleShowCodeUpdate('rgb')}>rgb()</button>
					</div>
				</div>
				<div className="palette-size-buttons">
					<div className={inputClassName}>
						<input
							id="stroke-width-slider"
							aria-label="stroke-width-slider"
							ref={this.inputRef}
							defaultValue="32"
							type="range"
							min="4"
							max="64"
							step="4"
							onChange={this.handleStrokeUpdate}
						/>
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