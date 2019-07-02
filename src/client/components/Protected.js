import React,{Component} from 'react';

class Protected extends React.Component {
    render() {
        return(
             <Text>Protected</Text>
        )
    }
}

class Text extends Component {
    render() {
    return <span>{this.props.children}</span>
    }
}

export default Protected;