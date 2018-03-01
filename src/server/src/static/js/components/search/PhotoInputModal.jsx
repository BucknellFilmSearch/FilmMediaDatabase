/**
 * This file is a dialog that contains the PhotoDropZone component.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */


import * as React from 'react';
import PhotoDropZone from './PhotoDropZone.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


/**
 * Uses a Material-UI dialog to enclose the PhotoDropZone component.
 */
export default class PhotoInputModal extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    };

    handleClose() {
        this.setState({
            open: false
        });
    };

    render() {

        // actions for the photo box modal
        const actions = [
            <FlatButton label='Cancel' primary={ true } onTouchTap={ this.handleClose } />
        ];

        return (
            <div id='photoIconImage' className='hoverHighlight' onTouchTap={ this.handleOpen }>
              <img src='/static/imageFiles/colorIcon.svg' style={ { 'width': '200px' } } />
              <br />
              <svg height='60' width='200'>
                <text x='0' y='30' fontSize='30px'>Color Search</text>
              </svg>
              <Dialog actions={ actions } modal={ false } open={ this.state.open } autoScrollBodyContent={ true } onRequestClose={ this.handleClose }>
                <PhotoDropZone/>
              </Dialog>
            </div>
            );
    }

}