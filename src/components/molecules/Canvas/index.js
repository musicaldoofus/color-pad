import React, { Component, Fragment } from 'react';
import trashIcon from '../../../media/trash-icon.svg';
import shareIcon from '../../../media/share-icon.svg';
import './Canvas.css';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPainting: false
		};
		this.canvasRef = React.createRef();
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.getCoords = this.getCoords.bind(this);
		this.drawAt = this.drawAt.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleShare = this.handleShare.bind(this);
		this.handleDismissShare = this.handleDismissShare.bind(this);
	}
	
	componentDidMount() {
		const canvas = this.canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
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
	}
	
	handleShare() {
		const canvas = this.canvasRef.current;
		const url = canvas.toDataURL();
		this.setState({showShareUrl: true});
		
	}
	
	handleDismissShare() {
		this.setState({showShareUrl: false});
	}
	
	render() {
		return (
			<Fragment>
				<div className="center-absolute">
					<div>
						<h3>Draw on me!</h3>
					</div>
					<div className="header-icons">
						<img src={trashIcon} alt="Clear the canvas" onClick={this.handleClear}/>
						<img src={shareIcon} alt="Share your painting" onClick={this.handleShare}/>
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
			</Fragment>
		);
	}
}

export default Canvas;