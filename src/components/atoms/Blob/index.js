import React, { Component} from 'react';

class Blob extends Component {
	handleMouseUp() {
		this.setState({growing: false});
	}

	render() {
		console.log(this.props);
		return (
			<div
				className="blob"
				style={{
					top: this.props.y - (this.props.size / 2),
					left: this.props.x - (this.props.size / 2)
				}}
			>
			</div>
		);
	}
}

const toBlob = (b, size) => <Blob key={b.x + '-' + b.y} {...b} size={size}/>;

export default Blob;
export { toBlob };