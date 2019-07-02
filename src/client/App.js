import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import LogoView from './templates/LogoView';
import AuthView from './templates/AuthView';
import PrivateView from './templates/PrivateView';



class App extends React.Component {
  constructor(props) {
    super(props)

    

    
     

    this.state = {
      setTimeoutLogoView: true,
      redirectToReferrer: false,
      username: null,
      response: 0,
    }
  }



  componentDidMount() {

    setTimeout(() => {
      this.setState({
        setTimeoutLogoView: false
      })
      // console.log(`setTimeoutLogoView: ${this.state.setTimeoutLogoView}`);
    }, 3000)


    fetch('/')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));



    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ redirectToReferrer: true });
      }
    });
  }


  render() {
    return (
      <Router>
        <View style={view_style.container} >
          {this.state.setTimeoutLogoView
            ? <LogoView />
            : <Switch location={this.location}>
              {this.state.redirectToReferrer
                ? <Route exact path="/" component={PrivateView} />
                : <Route exact path="/" component={AuthView} />
              }
            </Switch>
          }
        </View>
      </Router>
    )
  }
}

class View extends Component {
  render() {
    return (
      <div style={this.props.style} >
        {this.props.children}
      </div>
    )
  }
}

const view_style = {
  container: {
    display: 'flex'
  }
}


export default App;
