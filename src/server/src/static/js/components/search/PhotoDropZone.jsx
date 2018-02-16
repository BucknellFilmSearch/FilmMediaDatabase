/**
 * This file adds the ability to drop an image for the color search.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from "react";
let Dropzone = require('react-dropzone');


/**
 * Uses React-Dropzone to enable drag and drop functionality for images.
 * NOTE: this class still needs to be completed once the color search API is complete
 */
export default class PhotoDropZone extends React.Component {

    /**
     * Binds event handlers to the class.
     */
    constructor() {
        super();
        this.onDrop = this.onDrop.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
    }

    /**
     * Event handler when an image is dropped.
     *
     * TODO - finish this function when the color search API is complete
     */
    onDrop(files) {
        console.log('Received files: ', files);
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }


    /**
     * Renders the dropzone component to the page.
     */
    render() {
        return (
            <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={false} disableClick={true} style="width:15px">
                    <div id="photoModal">
                        <img src="/static/imageFiles/photoUploadIcon.svg" />
                        <div>
                            <button type="button" onClick={this.onOpenClick}>
                            Browse
                            </button> or drag images here.
                        </div>
                    </div>
                </Dropzone>
            </div>
        );
    }
};
