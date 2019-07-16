import React, { Component } from 'react';
import firebase from 'firebase';
// import { Redirect } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import View from '../components/View';




// Configure Firebase.
const config = {
    apiKey: "AIzaSyAavAERYgTafnnYxjIGaW9Xb7GaUdgSvLk",
    authDomain: "share-we-go.firebaseapp.com",
    databaseURL: "https://share-we-go.firebaseio.com",
    projectId: "share-we-go",
    storageBucket: "share-we-go.appspot.com",
    messagingSenderId: "950367710306",
    appId: "1:950367710306:web:219271895378fa7e"
  };
  firebase.initializeApp(config);
  
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // 'audio'
          size: 'normal', // 'invisible' or 'compact'
          badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: 'TH',
        whitelistedCountries: ['TH', '+66']
      }
    ]
  };

class AuthView extends React.Component {

    render() {
        return (
            <View style={view_style.container}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </View>
        )
    }
}


const view_style = {
    container: {
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#274D7D',
    },
}

export default AuthView;