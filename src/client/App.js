import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import firebase from 'firebase';
// import logo from './logo.svg';
import posed, { PoseGroup } from 'react-pose';
import './App.css';
import AuthView from './templates/AuthView';
import LogoView from './templates/LogoView';
import PrivateView from './templates/PrivateView';
import View from './components/View';



class App extends React.Component {
  state = { redirectToReferrer: false }
  componentDidMount() {
    // บล็อกการ zoom
    document.firstElementChild.style.zoom = "reset";

    // เชคค่าสถานะ auth ของ firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });

  }

  render() {

    // let { from } = this.props.location.state || { from: { pathname: "/protected" } };
    // console.log(this.state.position);
    const RouteContainer = posed.div({
      enter: { opacity: 1, delay: 300, beforeChildren: true },
      exit: { opacity: 0 }
    });


    return (
      <Router>
        <Route render={({ location }) => (
          <PoseGroup>
            <RouteContainer key={location.pathname}>
              <Redirect to="/protected" />
              <View style={view_style.container} >
                <Switch location={location}>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/protected" component={PrivateView} />
                </Switch>
              </View>
            </RouteContainer>
          </PoseGroup>
        )} />
      </Router>
    )
  }
}

// ฐานเชค ข้อมูล login
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    // กำหนดเวลาแสดงผล
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    // กำหนดเวลาแสดงผล
    setTimeout(cb, 100);
  }
};

// เชค และ กำหนด url 
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class Login extends Component {
  state = { redirectToReferrer: false, setTimeoutLogoView: true, };


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        setTimeoutLogoView: false
      })
      // console.log(`setTimeoutLogoView: ${this.state.setTimeoutLogoView}`);
    }, 3000)

    // เชคค่าสถานะ auth ของ firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
      } else {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = false
        this.setState({ redirectToReferrer: false });
      }
    });

  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <React.Fragment>
        {this.state.setTimeoutLogoView
          ? <LogoView />
          : <AuthView />
        }
      </React.Fragment>
    );
  }
}

const view_style = {
  container: {
    display: 'flex'
  }
}


export default App;
