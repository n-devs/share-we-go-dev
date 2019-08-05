import React from 'react';
// import * as firebase from 'firebase';
import { Map, ConnectApiMaps } from '../../lib/maps';
import { withRouter, Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import Search from '../Search';
import './style.css';


class Maps extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
    }



    render() {
        // ค้นหา ตัวแปล google และ position ใน this.props
        const { google, position } = this.props;

        // กำหนดตัวแปล latlng
        var latlng;
        if (!position) {
            // แทนค่า ตัวแปล latlng ลงไป
            latlng = { lat: 14.013235199999999, lng: 100.6985216 }
        } else {
            // แทนค่า ตัวแปล latlng ลงไป
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
                        // มี bug icon ไม่เกาะ map
                        if (this.div) {
                            // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
                           this.position = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);
                            this.pos = this.getProjection().fromLatLngToDivPixel(this.position);
                            this.div.style.left = this.pos.x + 'px';
                            this.div.style.top = this.pos.y + 'px';
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


                    // ระบุทำแหน่งปัจจุบัย
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
                <SearchBar >
                    <Search {...this.props} />
                </SearchBar>
            </Map>
        )
    }
}

export default withRouter(ConnectApiMaps({
    apiKey: "AIzaSyCrGaroYIOPAu9IakE6gEzY2sa5t23mCpQ",
    libraries: ['places', 'geometry'],
})(Maps));