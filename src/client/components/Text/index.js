import React from 'react';
import PropTypes from 'prop-types';

class Text extends Component {
    render() {
    return <span style={this.props.style}>{this.props.children}</span>
    }
}

View.propTypes = {
    style: PropTypes.object
}

export default Text;