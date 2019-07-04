import React from 'react';
import { Map } from '../lib/maps'



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
                DrawingOnMap={(maps, map) => {
                    let infoWindow = new maps.InfoWindow;

                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.watchPosition(function (position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent(`lat: ${pos.lat} lng: ${pos.lng}`);
                            infoWindow.open(map);
                            map.setCenter(pos);
                        }, function () {
                            handleLocationError(true, infoWindow, map.getCenter());
                        },{timeout:0});
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());

                    }

                    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                        infoWindow.setPosition(pos);
                        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
                        infoWindow.open(map);
                    }
                }
                }
            />
        )
    }
}

export default Maps;