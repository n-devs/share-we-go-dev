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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255, 255, 255, 0)',
        }
    },
});



class Bar extends React.Component {
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
                <ThemeProvider theme={theme}>
                    <AppBar position="static"
                        color='primary'
                        elevation={0}
                    >
                        <Toolbar
                        className={classes.gutters}
                        >
                            {/* <IconButton
                            edge="start"
                            // className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                        >
                            <MenuIcon />
                        </IconButton> */}
                            <Search map={this.props.map} google={this.props.google} />
                            {/* <div style={{
                            flexGrow: 1,
                            position: 'absolute'
                        }} />
                        <div style={{
                            // display: 'flex',
                            width: '-webkit-fill-available'
                        }}>
                            <IconButton
                                aria-label="Account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                                style={{
                                    padding: 0,
                                    fontSize: '0.8rem',
                                    float: 'right'
                                }}
                            >
                                <p>แชร์ตำแหน่ง</p>
                            </IconButton>
                        </div> */}
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </div>
        )
    }
}

Bar.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object
}

// กำหนด style
const styles = {
    gutters:{
        paddingLeft:25,
        paddingRight:25
    }
}


export default withStyles(styles)(Bar);