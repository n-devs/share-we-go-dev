import React from 'react';
import PropTypes from 'prop-types';
import MapLoader from '../../../MapsLoader';

const inlineStyles = {
    position: "absolute",
    overflow: "hidden",
    height: "100%",
    width: "100%",
}

const connect = {
    key: 'AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc',
    libraries: 'places'
}

class GoogleMap extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        MapLoader(connect, this.initMap)
    }

    initMap = () => {
        var { MapOptions, Methods,DrawingOnMap, bounds_changed,
            center_changed, click, dblclick, drag, dragend,
            dragstart, heading_changed, idle, maptypeid_changed,
            mousemove, mouseout, mouseover, projection_changed,
            rightclick, tilesloaded, tilt_changed, zoom_changed
        } = this.props;
        this.maps = window.google.maps
        this.map = new this.maps.Map(this.ref_map, MapOptions)
        if(DrawingOnMap) {
            DrawingOnMap(this.maps,this.map)
        }
        if (Methods) {
            Methods(this.map)
        }

        if (bounds_changed) {
            bounds_changed()
        }
        if (center_changed) {
            center_changed()
        }
        if (click) {
            click(event)
        }
        if (dblclick) {
            dblclick(event)
        }
        if (drag) {
            drag()
        }
        if (dragend) {
            dragend()
        }
        if (dragstart) {
            dragstart()
        }
        if (heading_changed) {
            heading_changed()
        }
        if (idle) {
            idle()
        }
        if (maptypeid_changed) {
            maptypeid_changed()
        }
        if (mousemove) {
            mousemove(event)
        }
        if (mouseout) {
            mouseout(event)
        }
        if (mouseover) {
            mouseover(event)
        }
        if (projection_changed) {
            projection_changed()
        }
        if (rightclick) {
            rightclick(event)
        }
        if (tilesloaded) {
            tilesloaded()
        }
        if (tilt_changed) {
            tilt_changed()
        }
        if (zoom_changed) {
            zoom_changed()
        }
    }
    render() {
        return <div ref={ref => (this.ref_map = ref)} style={inlineStyles} />
    }
}

GoogleMap.propTypes = {
    // autoFitBounds: PropTypes.bool,
    // boundsOffset: PropTypes.number,
    // coordinates: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         onLoaded: PropTypes.func,
    //     })
    // ),
    MapOptions: PropTypes.object.isRequired,
    DrawingOnMap: PropTypes.func,
    Methods: PropTypes.func,
    bounds_changed: PropTypes.func,
    center_changed: PropTypes.func,
    click: PropTypes.func,
    dblclick: PropTypes.func,
    drag: PropTypes.func,
    dragend: PropTypes.func,
    dragstart: PropTypes.func,
    heading_changed: PropTypes.func,
    idle: PropTypes.func,
    maptypeid_changed: PropTypes.func,
    mousemove: PropTypes.func,
    mouseout: PropTypes.func,
    mouseover: PropTypes.func,
    projection_changed: PropTypes.func,
    rightclick: PropTypes.func,
    tilesloaded: PropTypes.func,
    tilt_changed: PropTypes.func,
    zoom_changed: PropTypes.func,
    // onLoaded: PropTypes.func,
}

// GoogleMap.defaultProps = {
//     autoFitBounds: false,
//     boundsOffset: 0.002,
//     coordinates: [],
//     onLoaded: null,
// }

// const YOUR_API_KEY = "AIzaSyC0sxMyj3-daWXmS8fwrAJrNpUuq9L19fI"

export default GoogleMap;