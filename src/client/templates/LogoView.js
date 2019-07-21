import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import View from '../components/View';
import Image from '../components/Image';
import LOGO from '../images/LOGO_AI_V7.png';

class LogoView extends React.Component {
    render() {
        const AinmationRoute = posed.div({
            enter: { opacity: 0},
            exit: { opacity: 1, delay: 1, beforeChildren: true }
        })
        return (
            <View style={view_style.container}>
                <AinmationRoute>
                    <Image src={LOGO} />
                </AinmationRoute>
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


export default LogoView;