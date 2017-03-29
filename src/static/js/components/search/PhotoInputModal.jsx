import * as React from "react";

import PhotoDropZone from './PhotoDropZone.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class PhotoInputModal extends React.Component {

    constructor() {
        super();
        this.state = {open: false};
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    render() {

        // actions for the photo box modal
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        return (
                <div id="photoIconImage">
                    <img src="/static/imageFiles/photoIcon.jpg" onTouchTap={this.handleOpen}></img>

                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleClose}
                    >
                        <PhotoDropZone/>
                    </Dialog>

                </div>
        );
    }

}