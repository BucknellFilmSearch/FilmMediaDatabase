import * as React from "react";
import {DEBUG_MODE} from "../../app";

export class ScreenshotWithCaption extends React.Component<any, {}> {

    render() {
        var movieOclcId = this.props.movieOclcId;

        return (
            <div>
                <img className='thumbnail' style={{margin: "auto"}}
                     src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + this.props.screenshotWithCaption.movieLineNumber + ".png"}
                     width='720' height='480'/>
                <p className="list-group-item-text">Line #{ this.props.screenshotWithCaption.movieLineNumber }</p>
                    <p className="list-group-item-text">From { this.props.screenshotWithCaption.movieStartTimeStamp }
                        to { this.props.screenshotWithCaption.movieEndTimeStamp }</p>
                <p className="list-group-item-text"> { this.props.screenshotWithCaption.movieLineText } </p>
            </div>
        )
    }
}