import React, { Component } from 'react';

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}
	
	render() {
		return (
			<canvas ref={this.canvasRef}/>
		);
	}
}

export default Canvas;