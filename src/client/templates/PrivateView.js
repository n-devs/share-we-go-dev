import React, { Component } from 'react';
import View from '../components/View';
import Maps from '../components/Maps';

class PrivateView extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount() {
        navigator.geolocation.watchPosition((position) => {
            // this.pos = this.props.google.maps.LatLng(position.coords.latitude,position.coords.longitude)
            this.setState({ position: { lat: position.coords.latitude, lng: position.coords.longitude } })
        })
    }
    render() {
        return (
            <View>
                <Maps position={this.state.position} />
            </View>
        )
    }
}

export default PrivateView;

