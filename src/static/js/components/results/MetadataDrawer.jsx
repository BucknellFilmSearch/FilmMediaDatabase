import * as React from "react";
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux';

class MetadataDrawer extends React.Component<any, any> {
    render() {
        return (
            <Drawer docked={true} open={true} openSecondary={true} zDepth={2}>
                Metadata <br />

                {this.props.hover.movieOclcId} <br />

                {this.props.hover.movieTitle} <br />

                {this.props.hover.caption}
            </Drawer>
        )
    }
}


// Map Redux state to component props
function mapStateToProps(state) {
    console.log(state);
    return {
        hover: {
            movieOclcId: state.hoverMovieOclcId,
            movieTitle: state.hoverMovieTitle,
            caption: state.hoverCaption
        }
    }
}

export const ConnectedMetadataDrawer= connect(
    mapStateToProps
)(MetadataDrawer);