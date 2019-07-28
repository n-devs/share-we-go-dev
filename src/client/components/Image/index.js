import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
    render() {
        return <img
            src={this.props.src ? this.props.src : null}
            width={this.props.width ? this.props.width : null}
            height={this.props.height ? this.props.height : null}
            style={this.props.style ? this.props.style : null}
        />
    }
}

Image.propTypes = {
    src: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object
}

export default Image;
