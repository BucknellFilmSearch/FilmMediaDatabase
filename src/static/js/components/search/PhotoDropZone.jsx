var React = require('react');
var Dropzone = require('react-dropzone');


export default class PhotoDropZone extends React.Component {

    constructor() {
        super();
        this.onDrop = this.onDrop.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
    }

    onDrop(files) {
        console.log('Received files: ', files);
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    render() {
        return (
            <div>
                <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={false} disableClick={true} style="width:15px">
                    <div id="photoModal">
                        <img src="/static/imageFiles/photoUploadIcon.jpg"></img>
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
