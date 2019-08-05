import React, { Component } from 'react';
import View from '../../components/View';

class HomeView extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount() {
        // ระบุตำแหน่ง
        navigator.geolocation.watchPosition((position) => {
            // this.pos = this.props.google.maps.LatLng(position.coords.latitude,position.coords.longitude)
            this.setState({ position: { lat: position.coords.latitude, lng: position.coords.longitude } })
        })
    }
    render() {
        return (
            <View>
                home page
            </View>
        )
    }
}

export default HomeView;

