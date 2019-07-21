import React, { Component, Fragment } from 'react';
import PropsTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import Autocomplete from '../lib/maps/components/Places/Autocomplete';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(22, 109, 202, 0.81)',
        }
    },
});

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props,
            mapApiLoaded: false,
            places: [],
        };
    }

    componentDidMount() {
        this.setState({
            mapApiLoaded: true,
        });
    };

    setPlace = ({ place } = this.props) => {
        this.setState({ places: [place] });
    };

    render() {
        const { mapApiLoaded, google } = this.state;
        const { classes } = this.props
        return (
            <Paper className={classes.root} elevation={2} >
                <IconButton className={classes.iconButton} aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Autocomplete
                    map={this.props.map}
                    google={google}
                    setPlace={this.setPlace}
                    style={{
                        color: 'inherit',
                        padding: '0px 0px',
                        width: '-webkit-fill-available',
                    }}
                />
                <Divider className={classes.divider} />
                <ThemeProvider theme={theme}>
                    <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                        <DirectionsIcon />
                    </IconButton>
                </ThemeProvider>
            </Paper>
        )
    }
}

const styles = {
    root: {
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.79)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.79)',
        },
        marginRight: 5,
        marginLeft: 5,
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
}

Search.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object
}


export default withStyles(styles)(Search);