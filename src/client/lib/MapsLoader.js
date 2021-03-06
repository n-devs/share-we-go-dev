import React from 'react';
import ScriptsLoader from './ScriptsLoader';

function MapsLoader (connect,initMap) {

    console.log(connect);
    
    ScriptsLoader(`https://maps.googleapis.com/maps/api/js?key=${connect.key}&libraries=${connect.libraries}&callback=initMap`)

    window.initMap = initMap;
}

export default MapsLoader;