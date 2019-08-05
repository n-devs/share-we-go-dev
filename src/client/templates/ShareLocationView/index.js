import React, { Component } from 'react';
import View from '../../components/View';
import ShareLocationBar from '../../components/ShareLocationBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIOSIcon from '@material-ui/icons/ArrowBackIOS';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
// import './style.css'

function getSteps() {
    return ['เส้นทาง', 'เวลา', 'ผู้ร่วมทาง'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Uknown stepIndex';
    }
}


class ShareLocationView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeStep: 0 }
        this.handleGoBackPage = this.handleGoBackPage.bind(this)
    }

    handleGoBackPage() {
        event.preventDefault()
        this.props.history.goBack()
    }

    handleReset() {
        this.setState({ activeStep: 0 })
    }

    handleBack() {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }

    handleNext() {
        this.setState({ activeStep: this.state.activeStep + 1 })
    }

    render() {
        const { classes } = this.props
        const steps = getSteps();
        return (
            <View>
                <ShareLocationBar>
                    <Button onClick={this.handleGoBackPage}>
                        <IconButton aria-label="Back" >
                            <ArrowBackIOSIcon />
                        </IconButton>
                    </Button>
                    <Stepper className={classes.root} activeStep={this.state.activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step  key={label}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </ShareLocationBar>
            </View>
        )
    }
}

const styles = {
    root: {
        width: '-webkit-fill-available',
        padding: '0px 0px 9px 0px'
    },
    label: {
        '&alternativeLabel': {
            marginTop: '0px',
            textAlign: 'center'
        }
    },
    alternativeLabel: {}
}

ShareLocationView.propTypes = {
    history: PropTypes.object
}

export default withRouter(withStyles(styles)(ShareLocationView));

