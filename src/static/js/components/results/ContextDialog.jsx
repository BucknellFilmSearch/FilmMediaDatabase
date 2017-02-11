import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';


const customContentStyle = {
    width: '90%',
    maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class ContextDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
        this.props.onCloseContextDialog();
    }

    componentWillReceiveProps(nextProps) {
        console.log('new context props:');
        console.log(nextProps);
        if (this.state.open === false && nextProps.clickedScreenshotMovieOclcId !== null) {
            console.log('opening');
            this.handleOpen();
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];


        let imgSrc =
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.clickedScreenshotMovieOclcId + "/" + this.props.clickedScreenshotMovieLineNumber + ".png";


        return (
            <Dialog
                title="Dialog With Custom Width"
                actions={actions}
                contentStyle={customContentStyle}
                modal={false}
                open={this.state.open}
            >
                {this.props.clickedScreenshotMovieOclcId} <br />
                {this.props.clickedScreenshotMovieLineNumber} <br />

                <img src={imgSrc} height="300px" />
            </Dialog>
        );
    }
}


const closeContextDialog = () => {
    return {
        type: 'CLOSE_CONTEXT_DIALOG'
    };
};


// Map Redux state to component props
function mapStateToProps(state) {
    return {
        clickedScreenshotMovieOclcId: state.clickedScreenshotMovieOclcId,
        clickedScreenshotMovieLineNumber: state.clickedScreenshotMovieLineNumber
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onCloseContextDialog: () => dispatch(closeContextDialog())
    }
}

export const ConnectedContextDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextDialog);