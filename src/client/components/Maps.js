import React from 'react';
import * as firebase from 'firebase';
import { Map, ConnectApiMaps, Marker, OverlayView } from '../lib/maps';
import { withRouter } from 'react-router-dom';



class Maps extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
    }



    render() {
        const { google, position } = this.props
        // let { position } = this.state
        var latlng;
        if (!position) {
            latlng = { lat: 14.013235199999999, lng: 100.6985216 }
        } else {
            latlng = { lat: position.lat, lng: position.lng }
        }


        return (
            <Map
                google={this.props.google}
                opts={{
                    zoom: 15,
                    center: { lat: latlng.lat, lng: latlng.lat },
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
                setCenter={new google.maps.LatLng(latlng.lat, latlng.lng)}
            // getZoom={val => console.log(val)}
            // getCenter={val => console.log(val.lat(), val.lng())}
            >

                <OverlayView
                    elementType="div"
                    position={latlng}
                    setPaneName="overlayMouseTarget"
                >
                    <img src="https://img.icons8.com/material-sharp/24/000000/user-male-circle.png" />
                </OverlayView>
                <div style={{ position: 'absolute' }}>
                    <button onClick={() => {
                        firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                            window.location.href='/'
                          }, function(error) {
                            // An error happened.
                          });
                    }}>LOGOUT</button>
                </div>
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