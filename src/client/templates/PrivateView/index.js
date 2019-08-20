import React, { Component } from 'react';
import PropTypes from 'prop-types'
import View from '../../components/View';
import Maps from '../../components/Maps';

class PrivateView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View>
                <Maps position={this.props.position} />
            </View>
        )
    }
}

PrivateView.propTypes = {
    position: PropTypes.object
}

export default PrivateView;

