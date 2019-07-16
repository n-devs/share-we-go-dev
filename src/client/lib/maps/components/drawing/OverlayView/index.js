import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
// import invariant from "invariant"
import PropTypes from 'prop-types';
// import render from 'preact-render-to-string';
// import _ from "lodash";
// import { getOffsetOverride, getLayoutStyles } from "./dom-helper"
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
const { ReactTestComponent } = prettyFormat.plugins;

const wrappedPromise = function () {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
}

export class OverlayView extends React.Component {
  componentDidMount() {
    this.overlayViewPromise = wrappedPromise();
    this.renderOverlayView();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map)) {
      if (this.overlayView) {
        this.overlayView.setMap(null);
      }
      this.renderOverlayView();
    }
  }

  componentWillUnmount() {
    if (this.overlayView) {
      this.overlayView.setMap(null);
    }
  }

  renderOverlayView() {
    // var { google,elementType,setPaneName ,position} = this.props

    if (!window.google) {
      return null
    }

    function USGSOverlay(google, elementType, latlng, bounds, map, args, setPaneName, children) {
      // this.google = google;
      this.elementType = "div";
      this.latlng = latlng;
      this.bounds = bounds;
      this.map = map;
      this.args = args;
      this.setPaneName = setPaneName;
      this.children = children;
      this.setMap(map);
    }

    USGSOverlay.prototype = new window.google.maps.OverlayView();

    USGSOverlay.prototype.onAdd = function () {
      var self = this;
      var div = this.div;
      // const { google } = this.props
      if (!div) {
        // Generate marker html
        div = this.div = document.createElement('div');
        div.className = 'custom-marker';
        div.style.position = 'absolute';
        var innerDiv = document.createElement(`${elementType}`);
        innerDiv.className = 'custom-marker-inner';
        innerDiv.innerHTML = prettyFormat(renderer.create(this.children), {
          plugins: [ReactTestComponent],
          printFunctionName: false
        });
        div.appendChild(innerDiv);

        if (typeof (self.args.marker_id) !== 'undefined') {
          div.dataset.marker_id = self.args.marker_id;
        }

        window.google.maps.event.addDomListener(div, "click", function (event) {
          window.google.maps.event.trigger(self, "click");
        });

        var panes = this.getPanes();
        panes[setPaneName].appendChild(div);
      }
    }

    USGSOverlay.prototype.draw = () => {
      // const { google } = this.props
      if (this.div) {
        let position = new window.google.maps.LatLng(this.latlng.lat, this.latlng.lng);
        var pos = this.getProjection().fromLatLngToDivPixel(position);
        this.div.style.left = pos.x + 'px';
        this.div.style.top = pos.y + 'px';
      }
    }

    USGSOverlay.prototype.getPosition = function () {
      return this.latlng;
    }

    return USGSOverlay

    //  var myLatlng = new google.maps.LatLng(position.lat, position.lng);

    //   var useOverlay = new USGSOverlay(
    //     this.props.google,
    //     document.createElement('div'),
    //     myLatlng,
    //     this.props.bounds,
    //     this.props.map,
    //     {},
    //     this.props.setPaneName,
    //     this.props.children
    //   );

    // var positions = [{ lat: position.lat, lng: position.lng }]
    // positions.push({ lat: position.lat, lng: position.lng })
    // console.log(positions);

    // useOverlay.latlng = { lat: position.lat, lng: position.lng };
    // useOverlay.draw();
    // setInterval(function(){
    //   console.log({ lat: position.lat, lng: position.lng });
    //   useOverlay.latlng = { lat: position.lat, lng: position.lng }
    //   useOverlay.draw();
    // }, 1000);

  }




  render() {
    // var {
    //   google, map, elementType, setPaneName, position, bounds, children, getPixelPositionOffset
    // } = this.props;

    var { position, elementType } = this.props
    var myLatlng = new google.maps.LatLng(position.lat, position.lng);

    var USGSOverlay = this.renderOverlayView()
    var useOverlay = USGSOverlay(
      this.props.google,
      elementType,
      myLatlng,
      this.props.bounds,
      this.props.map,
      {},
      this.props.setPaneName,
      this.props.children
    );


    // var positions = [{ lat: position.lat, lng: position.lng }]
    // positions.push({ lat: position.lat, lng: position.lng })
    // console.log(positions);

    useOverlay.latlng = { lat: position.lat, lng: position.lng };
    useOverlay.draw()
    // setInterval(function(){
    //   console.log({ lat: position.lat, lng: position.lng });
    //   useOverlay.latlng = { lat: position.lat, lng: position.lng }
    //   useOverlay.draw
    // }, 1000);

    return (
      <Fragment>
        {this.props.children ? (
          React.Children.only(
            React.cloneElement(
              this.props.children,
              {
                google: this.props.google,
                map: this.props.map
              }
            )
          )) : null
        }
      </Fragment>
    )
  }

}

OverlayView.propTypes = {
  elementType: PropTypes.string,
  setPaneName: PropTypes.string,
  position: PropTypes.object,
  bounds: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default OverlayView;