import React, { Component } from 'react';
import View from '../../components/View';
import ShareLocationBar from '../../components/ShareLocationBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
// import './style.css'

function getSteps() {
    return ['ปลายทาง', 'เวลา', 'ผู้ร่วมทาง'];
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

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    )
}


// function InputSearch(props) {
//     const [places, setPlaces] = React.useState([])

//     const setPlace = ({ place } = props) => {
//         const newPlace = [place]
//         setPlaces(newPlace)
//     }

//     return (
//         <Autocomplete
//             map={this.props.map}
//             google={google}
//             setPlace={setPlace}
//             style={{
//                 color: 'inherit',
//                 padding: '0px 0px',
//                 width: '-webkit-fill-available',
//             }}
//         />
//     )
// }



class ShareLocationView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { activeStep: 0, completed: {} }
        this.goBack = this.goBack.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
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

    handleComplete() {
        const newCompleted = this.state.completed;
        newCompleted[this.state.activeStep] = true;

        this.setState({ completed: newCompleted });

        this.handleNext();

    }

    goBack() {
        if (this.state.activeStep === 0) {
            this.handleGoBackPage();
        } else {
            this.handleBack();
        }
    }

    render() {
        const { classes } = this.props
        const steps = getSteps();
        const { completed } = this.state

        function totalStaps() {
            return steps.length;
        }

        function completedSteps() {
            return Object.keys(completed).length
        }

        function allStepsCompleted() {
            return completedSteps() === totalStaps();
        }

        function stepsShow() {
            if (completedSteps() === totalStaps() - 1) {
                let text = 'เสร็จสิ้น';
                return text
            } else {
                let text = 'ขั้นตอนต่อไป';
                return text
            }
        }

        return (
            <View>
                {allStepsCompleted() ? (
                    <View></View>
                ) : (
                        <View>
                            <ShareLocationBar>
                                <Button onClick={this.goBack}>
                                    <IconButton aria-label="Back" >
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                </Button>
                                <Stepper className={classes.root} activeStep={this.state.activeStep} alternativeLabel>
                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </ShareLocationBar>
                            <View style={{
                                position: 'absolute',
                                top: '100px',
                                width: '-webkit-fill-available',
                                height: '-webkit-fill-available',
                            }}>
                                <center>
                                    <View>
                                        <Typography className={classes.instructions}>{getStepContent(this.state.activeStep)}</Typography>
                                    </View>
                                    <Button variant='contained' color='primary' onClick={this.handleComplete}>
                                        {stepsShow()}
                                        {/* {completedSteps() === totalStaps() - 1 ? 'เสร็จสิ้น' : 'ขั้นตอนต่อไป'} */}
                                    </Button>
                                </center>
                            </View>
                        </View>
                    )}
            </View>
        )
    }
}

const styles = {
    root: {
        width: '-webkit-fill-available',
        padding: '30px 0px 10px 0px'
    },
    label: {
        '&alternativeLabel': {
            marginTop: '0px',
            textAlign: 'center'
        }
    },
    alternativeLabel: {},
    instructions: {
        marginTop: 10,
        marginBottom: 10
    }
}

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center'
    },
    active: {
        color: '#784af4'
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18
    }
})

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool
};

ShareLocationView.propTypes = {
    history: PropTypes.object
}

export default withRouter(withStyles(styles)(ShareLocationView));

