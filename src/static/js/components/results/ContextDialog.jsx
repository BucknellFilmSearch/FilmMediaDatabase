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

    // slideLeft() {
    //     // TODO - move this to reducer
    //     if (this.state.currentMovieLineNumber !== 1) {
    //         this.setState({
    //             currentMovieLineNumber: this.state.currentMovieLineNumber - 1
    //         });
    //     }
    // }
    //
    // slideRight() {
    //     if (this.state.currentMovieLineNumber !== this.props.currentFilm.totalNumberOfLines) {
    //         this.setState({
    //             currentMovieLineNumber: this.state.currentMovieLineNumber + 1
    //         });
    //     }
    // }

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

        // let currentScreenshot = this.props.currentFilm.results.find(
        //     film => state.clickedScreenshotMovieOclcId === film.movieOclcId
        // );

        return (
            <Dialog
                title="The firehose/context"
                actions={actions}
                contentStyle={customContentStyle}
                modal={false}
                open={this.state.open}
                autoScrollBodyContent={true}
            >

                <img src={imgSrc} height="300px" />

                <div>
                    {this.props.clickedScreenshotMovieOclcId} <br />
                    {this.state.currentMovieLineNumber} <br />

                    <FlatButton
                        label={<LeftArrow/>}
                        primary={true}
                        onTouchTap={() => this.props.onSlideLeft}
                    />

                    <FlatButton
                        label={<RightArrow/>}
                        primary={true}
                        onTouchTap={() => this.props.onSlideRight}
                    /> <br />
                </div>


            </Dialog>
        );
    }
}


const closeContextDialog = () => {
    return {
        type: 'CLOSE_CONTEXT_DIALOG'
    };
};

const slideLeft = () => {
    return {
      type: 'SLIDE_CONTEXT_LEFT'
    };
};

const slideRight = () => {
    return {
        type: 'SLIDE_CONTEXT_RIGHT'
    }
};

const receiveContext = (context) => {
    return {
        type: 'RECEIVE_CONTEXT',
        movieOclcId: context.movieOclcId,
        context: context.results
    };
};

const slideAndCheckForContext = (slideFunction) => {
    return (dispatch) => {
        dispatch(slideFunction);

        return fetch(`/moviesearch/context/${this.props.individualFilm.movieOclcId}/${object.movieLineNumber}`)
            .then(response => response.json())
            .then(response => response.results[0])
            .then(response => dispatch(receiveContext(response)));

        // TODO - add catch handler to handle errors
    }
};


// Map Redux state to component props
function mapStateToProps(state) {
    console.log(state);
    return {
        clickedScreenshotMovieOclcId: state.clickedScreenshotMovieOclcId,
        clickedScreenshotMovieLineNumber: state.currentContextMovieLineNumber,
        currentFilm: !state.clickedScreenshotMovieOclcId ? null :
            state.search.response.find(
                film => state.clickedScreenshotMovieOclcId === film.movieOclcId
            )
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onCloseContextDialog: () => dispatch(closeContextDialog()),
        onSlideLeft: () => dispatch(slideAndCheckForContext(slideLeft)),
        onSlideRight: () => dispatch(slideAndCheckForContext(slideRight))
    }
}

export const ConnectedContextDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextDialog);