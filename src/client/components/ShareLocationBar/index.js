import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import PropsTypes from 'prop-types';
import { ThemeProvider,withStyles   } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Search from '../Search';
import './style.css'

const share_location_bar_theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255, 255, 255, 0)',
        }
    },
});



class ShareLocationBar extends React.Component {
    render() {
        // รับค่า ความยาวของขนาดจอ ไว้ในตัวแปล w 
        var w = window.innerWidth
        // รับค่า ที่ถ่ายทอดมาจาก this.props.classes ให้อยู่ในตัวแปล classes
        const {classes} =this.props
        return (
            <div style={{
                flexGrow: 1,
                position: 'absolute',
                width: w,
                flexDirection: 'column'
            }}>
                <ThemeProvider theme={share_location_bar_theme}>
                    <AppBar position="static"
                        color='default'
                        elevation={1}
                    >
                        <Toolbar
                        className={classes.gutters}
                        >
                            {this.props.children}
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </div>
        )
    }
}

ShareLocationBar.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object
}

// กำหนด style
const styles = {
    gutters:{
        paddingLeft:5,
        paddingRight:5
    }
}


export default withStyles(styles)(ShareLocationBar);