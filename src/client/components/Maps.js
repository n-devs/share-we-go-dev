import React from 'react';
import { Map, ConnectApiMaps, Marker, OverlayView } from '../lib/maps';
import { withRouter } from 'react-router-dom';



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
            position: { lat: 14.013235199999999, lng: 100.6985216 },
            friends: {},

        }
    }

    componentDidMount() {
        navigator.geolocation.watchPosition((position) => {
            // this.pos = this.props.google.maps.LatLng(position.coords.latitude,position.coords.longitude)
            this.setState({ position: { lat: position.coords.latitude, lng: position.coords.longitude } })
        })
    }

    render() {
        const { google } = this.props
        let { position } = this.state
       

        return (
            <Map
                google={this.props.google}
                opts={{
                    zoom: 15,
                    center: { lat: 14.013235199999999, lng: 100.6985216 },
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
                // setCenter={new google.maps.LatLng(position.lat, position.lng)}
                // getZoom={val => console.log(val)}
                // getCenter={val => console.log(val.lat(), val.lng())}
            >
                
                <OverlayView
                    elementType="div"
                    position={position}
                    setPaneName="overlayMouseTarget"
                >
                    <img src="https://img.icons8.com/material-sharp/24/000000/user-male-circle.png" />
                </OverlayView>
            </Map>
        )
    }
}

const Loading = () => <div>Fancy loading container</div>;

export default withRouter(ConnectApiMaps({
    apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
    libraries: ['places'],
    LoadingContainer: Loading
})(Maps));