import React from 'react'
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

const geo = setInterval(GeoLocationIO, 1000/60)

export { geo };
