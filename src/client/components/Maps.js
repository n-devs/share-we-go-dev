import React from 'react';
import * as firebase from 'firebase';
import { Map, ConnectApiMaps, OverlayView } from '../lib/maps';
import { withRouter } from 'react-router-dom';
import Bar from '../components/Bar';


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
                DrawingOnMap={(google, map) => {
                    function CustomMarker(latlng, map, args, children) {
                        this.latlng = latlng;
                        this.args = args;
                        this.children = children;
                        this.setMap(map);
                    }

                    CustomMarker.prototype = new google.maps.OverlayView();

                    CustomMarker.prototype.onAdd = function () {
                        var self = this;
                        var div = this.div;
                        if (!div) {
                            // Generate marker html
                            div = this.div = document.createElement('div');
                            div.className = 'custom-marker';
                            div.style.position = 'absolute';
                            var innerDiv = document.createElement('div');
                            innerDiv.className = 'custom-marker-inner';
                            innerDiv.innerHTML = '<img src="https://img.icons8.com/material-sharp/24/000000/user-male-circle.png" />'
                            div.appendChild(innerDiv);

                            if (typeof (self.args.marker_id) !== 'undefined') {
                                div.dataset.marker_id = self.args.marker_id;
                            }

                            google.maps.event.addDomListener(div, "click", function (event) {
                                google.maps.event.trigger(self, "click");
                            });

                            var panes = this.getPanes();
                            panes.overlayImage.appendChild(div);
                        }
                    };

                    CustomMarker.prototype.draw = function () {
                        if (this.div) {
                            let position = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);
                            var pos = this.getProjection().fromLatLngToDivPixel(position);
                            this.div.style.left = pos.x + 'px';
                            this.div.style.top = pos.y + 'px';
                        }
                    };

                    CustomMarker.prototype.getPosition = function () {
                        return this.latlng;
                    };

                    var myLatlng = new google.maps.LatLng(latlng.lat, latlng.lng);

                    var marker1 = new CustomMarker(
                        myLatlng,
                        map,
                        {}
                    );



                    if (navigator.geolocation) {
                        navigator.geolocation.watchPosition(function (position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            marker1.latlng = { lat: pos.lat, lng: pos.lng };
                            marker1.draw();

                            map.setCenter(pos);
                        }, function () {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());

                    }


                }}
            >

                <Bar google={this.props.google} map={this.props.map} />
                {/* <div style={{ position: 'absolute' }}> */}
                {/* <button onClick={() => {
                        firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                            window.location.href='/'
                          }, function(error) {
                            // An error happened.
                          });
                    }}>LOGOUT</button> */}
                {/* </div> */}
            </Map>
        )
    }
}

// const Loading = () => <div>Fancy loading container</div>;

export default withRouter(ConnectApiMaps({
    apiKey: "AIzaSyCrGaroYIOPAu9IakE6gEzY2sa5t23mCpQ",
    libraries: ['places', 'geometry'],
    // LoadingContainer: Loading
})(Maps));