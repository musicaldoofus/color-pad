import React, { Component, Fragment } from 'react';
import trashIcon from '../../../media/clear-icon.svg';
import saveIcon from '../../../media/save-icon.svg';
import collapseIcon from '../../../media/collapse-icon.svg';
import './Canvas.css';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPainting: false,
			isMenuCollapsed: false
		};
		this.canvasRef = React.createRef();
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.getCoords = this.getCoords.bind(this);
		this.drawAt = this.drawAt.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCollapse = this.handleCollapse.bind(this);
		// this.handleWindowResize = this.handleWindowResize.bind(this);
	}
	
	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		const canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
	// handleWindowResize(e) {
		// e.preventDefault();
		// console.log('handleWindowResize', this.canvasRef);
		// const img = new Image();
		// img.src = this.canvasRef.current.toDataURL();
		// this.canvasRef.current.getContext('2d').drawImage(img, 0, 0);
	// }
	
	getCoords(clientX, clientY) {
		const canvas = this.canvasRef.current;
		const boundingRect = canvas.getBoundingClientRect();
		const x = clientX - boundingRect.left;
		const y = clientY - boundingRect.top;
		return {x, y};
	}
	
	drawAt(clientX, clientY) {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext('2d');
		let {x, y} = this.getCoords(clientX, clientY);
		ctx.beginPath();
		ctx.fillStyle = `#${this.props.color.hex}`;
		
		//adjust for browsers that don't support .ellipse(); adjust for mobile support
		ctx.ellipse(x, y, this.props.stroke, this.props.stroke, 100, 0, 2 * Math.PI);
		ctx.fill();
	}	
	
	handleMouseUp({clientX, clientY}) {
		this.setState({isPainting: false});
		this.drawAt(clientX, clientY);
	}
	
	handleMouseMove({clientX, clientY}) {
		if (!this.state.isPainting) return;
		else this.drawAt(clientX, clientY);
	}
	
	handleMouseDown({clientX, clientY}) {
		this.setState({isPainting: true});
		this.drawAt(clientX, clientY);
	}
	
	handleClear() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.setState({shareUrl: null});
	}
	
	handleSave() {
		const canvas = this.canvasRef.current;
		const downloadBlob = (blob) => {
			const a = document.createElement('a');
			a.style.display = 'none';
			document.body.appendChild(a);
			a.href = window.URL.createObjectURL(blob);
			a.setAttribute("download", 'image from color pad');
			a.click();
			window.URL.revokeObjectURL(a.href);
			document.body.removeChild(a);
		}
		const data = canvas.toBlob(downloadBlob, 'image/png');
	}
	
	handleCollapse() {
		this.setState({isMenuCollapsed: !this.state.isMenuCollapsed});
	}
	
	render() {
		return (
			<div className="canvas-bg">
				<div className={`top-menu center-absolute ${this.state.isMenuCollapsed ? 'collapsed' : 'expanded'}`}>
					<div className="header-icons">
						<img className="btn header-icon" src={trashIcon} alt="Clear the canvas" onClick={this.handleClear}/>
						<img className="btn header-icon" src={saveIcon} alt="Share your painting" onClick={this.handleSave}/>
					</div>
					<div className={`collapse-btn ${this.state.isMenuCollapsed ? 'collapsed' : 'expanded'}`} onClick={this.handleCollapse}>
						<div>
							<span></span>
						</div>
						<div>
							<span></span>
						</div>
						<div>
							<span></span>
						</div>
					</div>
				</div>
				<canvas
					stroke={this.props.stroke}
					height={window.innerHeight}
					width={window.innerWidth}
					ref={this.canvasRef}
					onMouseDown={this.handleMouseDown}
					onMouseMove={this.handleMouseMove}
					onMouseUp={this.handleMouseUp}
				/>
			</div>
		);
	}
}

export default Canvas;