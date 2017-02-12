import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import {connect} from 'react-redux';


const customContentStyle = {
    width: '90%',
    maxWidth: 'none',
};

const LeftArrow = (props) => (
    <SvgIcon {...props}>
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
        <path d="M0-.5h24v24H0z" fill="none"/>
    </SvgIcon>
);

const RightArrow = (props) => (
    <SvgIcon  {...props}>
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
        <path d="M0-.25h24v24H0z" fill="none"/>
    </SvgIcon>
);


/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class ContextDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
    }

    handleOpen(clickedScreenshotMovieLineNumber) {
        this.setState({
            open: true,
            currentMovieLineNumber: clickedScreenshotMovieLineNumber
        });
    }

    handleClose() {
        this.setState({open: false});
        this.props.onCloseContextDialog();
    }

    slideLeft() {
        if (this.state.currentMovieLineNumber !== 1) {
            this.setState({
                currentMovieLineNumber: this.state.currentMovieLineNumber - 1
            });
        }
    }

    slideRight() {
        if (this.state.currentMovieLineNumber !== this.props.totalNumberOfLines) {
            this.setState({
                currentMovieLineNumber: this.state.currentMovieLineNumber + 1
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.open === false && nextProps.clickedScreenshotMovieOclcId !== null) {
            console.log('opening');
            this.handleOpen(nextProps.clickedScreenshotMovieLineNumber);
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];


        let imgSrc =
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + this.props.clickedScreenshotMovieOclcId + "/" + this.state.currentMovieLineNumber + ".png";


        return (
            <Dialog
                title="The firehose/context"
                actions={actions}
                contentStyle={customContentStyle}
                modal={false}
                open={this.state.open}
            >

                <FlatButton
                    label={<LeftArrow/>}
                    primary={true}
                    onTouchTap={this.slideLeft}
                />

                <FlatButton
                    label={<RightArrow/>}
                    primary={true}
                    onTouchTap={this.slideRight}
                /> <br />


                {this.props.clickedScreenshotMovieOclcId} <br />
                {this.state.currentMovieLineNumber} <br />

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
    console.log(state);
    return {
        clickedScreenshotMovieOclcId: state.clickedScreenshotMovieOclcId,
        clickedScreenshotMovieLineNumber: state.clickedScreenshotMovieLineNumber,
        totalNumberOfLines: !state.clickedScreenshotMovieOclcId ? null :
            state.search.response.find(
                film => state.clickedScreenshotMovieOclcId === film.movieOclcId
            ).totalNumberOfLines
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