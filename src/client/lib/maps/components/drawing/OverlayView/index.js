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
    const {
      google,
    } = this.props;

    if (!google) {
      return null
    }




    function USGSOverlay(elementType, setPaneName, position, bounds, children, getPixelPositionOffset, map) {

      // Initialize all properties.
      this.elementType = elementType;
      this.setPaneName = setPaneName;
      this.position = {
        lat:function () {return position.lat},
        lng:function() {return position.lng}
    }
      this.bounds = bounds;
      this.children = children;
      this.getPixelPositionOffset = getPixelPositionOffset;

      // Define a property to hold the image's div. We'll
      // actually create this div upon receipt of the onAdd()
      // method so we'll leave it null for now.





      this.div = document.createElement('div');
      this.div.margin = '0';
      this.div.style.position = 'absolute';
      // this.att = document.createAttribute('id')
      // this.att.value = 'user'
      // this.div.setAttributeNode(this.att)
      this.div.innerHTML = prettyFormat(renderer.create(this.children), {
        plugins: [ReactTestComponent],
        printFunctionName: false
      });

      this.elementType.appendChild(this.div)

      google.maps.OverlayView.preventMapHitsFrom(this.div);
      // Explicitly call setMap on this overlay.
    }

    USGSOverlay.prototype = new google.maps.OverlayView;

    USGSOverlay.prototype.onAdd = function () {
      this.mapPanes = this.getPanes();
      this.mapPanes[this.setPaneName].appendChild(this.div)
      // this.setMap(this.map);
    }

    USGSOverlay.prototype.draw = function () {

      this.divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
      // this.id = document.getElementById('user')

      // Hide the popup when it is far out of view.
      this.display = Math.abs(this.divPosition.x) < 4000 && Math.abs(this.divPosition.y) < 4000 ?
        'block' :
        'none';

      if (this.display === 'block') {
        this.div.style.left = `${this.divPosition.x - 13.8781}px`;
        this.div.style.top = `${this.divPosition.y - 41.5054}px`;

      }
      if (this.div.style.display !== this.display) {
        this.div.style.display = this.display;
      }
      // console.log(this.div.parentNode.length);

    }

    USGSOverlay.prototype.onRemove = function () {
      if (this.div.parentNode) {
        this.div.parentNode.removeChild(this.div)
        this.div = null
      }
    }

    return USGSOverlay;
  }




  render() {
    // var {
    //   google, map, elementType, setPaneName, position, bounds, children, getPixelPositionOffset
    // } = this.props;


    var USGSOverlay = this.renderOverlayView()
    var overlayView = new USGSOverlay(
      document.createElement(`${this.props.elementType}`),
      this.props.setPaneName,
      this.props.position,
      this.props.bounds,
      this.props.children,
      this.props.getPixelPositionOffset,
      this.props.map
    );

    overlayView.setMap(this.props.map)

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