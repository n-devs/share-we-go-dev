import React from 'react';
import PropTypes from 'prop-types';

class View extends React.Component {
    render() {
        return <div style={this.props.style}>{this.props.children}</div>
    }
}

View.propTypes = {
    style: PropTypes.object
}

export default View;