import React from 'react';
import { Map } from '../lib/maps'
import io from "socket.io-client";
const socket = io('ws://localhost:9000')

function GeoLocationIO() {

    navigator.geolocation.getCurrentPosition(
        function (position) {
            // console.log(position);

            socket.emit('position', {
                coords: {
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    altitudeAccuracy: position.coords.altitudeAccuracy,
                    heading: position.coords.heading,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    speed: position.coords.speed
                },
                timestamp: position.timestamp
            })
        },
        function (error) { console.log(error) },
        { enableHighAccuracy: true, timeout: 100, distanceFilter: 0 },
    );

}



class Maps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            myPosition: {
                latitude: 0,
                longitude: 0,
                timestamp: 0,
            },
            friends: {},
        }
    }
    componentDidMount() {
        setInterval(GeoLocationIO, 1000 / 60)

        socket.on('otherPositions', position => this.setState({ position: position }))
    }

    render() {
        return (
            <Map
                MapOptions={{
                    center: { lat: 14.013235199999999, lng: 100.6985216 },
                    zoom: 13,
                    disableDefaultUI: true,
                    styles: [{
                        featureType: 'poi.business',
                        stylers: [{ visibility: 'on' }]
                    },
                    {
                        featureType: 'transit',
                        elementType: 'labels.icon',
                        stylers: [{ visibility: 'off' }]
                    }]
                }}
                DrawingOnMap={(maps,map) => {
                    var marker = new maps.Marker({
                        position:{ lat: this.state.position.coords.latitude, lng: this.state.position.coords.longitude },
                        icon: {
                          path: maps.SymbolPath.CIRCLE,
                          scale: 5
                        },
                        draggable: false,
                        map: map
                      });
                }}
            />
        )
    }
}

export default Maps;