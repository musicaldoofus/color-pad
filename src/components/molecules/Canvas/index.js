import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log('<Canvas> componentDidUpdate', prevProps, prevState);
	}
	
	handleClick({clientX, clientY}) {
		const canvas = this.canvasRef.current;
		const boundingRect = canvas.getBoundingClientRect();
		console.log('boundingRect', boundingRect);
		const x = clientX - boundingRect.left;
		const y = clientY - boundingRect.top;
		console.log(x, y);
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = `#${this.props.color.hex}`;
		console.log('props', this.props);
		ctx.fillRect(x, y, this.props.stroke, this.props.stroke);
		console.log(ctx);
	}
	
	render() {
		return (
			<canvas height="300" width="300" ref={this.canvasRef} onMouseDown={this.handleClick}/>
		);
	}
}

export default Canvas;