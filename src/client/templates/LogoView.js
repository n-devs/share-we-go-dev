import React, { Component } from 'react';
import View from '../components/View';
import Image from '../components/Image';
import LOGO from '../images/LOGO_AI_V7.png';

class LogoView extends React.Component {
    render() {
        return (
            <View style={view_style.container}>
                <Image src={LOGO} />
            </View>
        )
    }
}

const view_style = {
    container: {
        flex:1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#274D7D',
    },
}


export default LogoView;