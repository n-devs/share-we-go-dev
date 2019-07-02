import React from 'react';

class View extends React.Component {
    render() {
        return <div style={this.props.style}>{this.props.children}</div>
    }
}

export default View;