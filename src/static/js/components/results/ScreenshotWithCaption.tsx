import * as React from "react";
import {DEBUG_MODE} from "../../app";

import {GridTile} from 'material-ui/GridList';

export class ScreenshotWithCaption extends React.Component<any, {}> {

    render() {
        let movieOclcId = this.props.movieOclcId;
        let imgSrc = DEBUG_MODE ?
            "/static/imageFiles/720x480.jpg" :
            "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + this.props.screenshotWithCaption.movieLineNumber + ".png";

        return (
            <GridTile
                title={`Line #${this.props.screenshotWithCaption.movieLineNumber}
                        from ${this.props.screenshotWithCaption.movieStartTimeStamp}
                        to ${this.props.screenshotWithCaption.movieEndTimeStamp}`
                      }
                subtitle={ this.props.screenshotWithCaption.movieLineText }
                style={{'height': '180px'}}>

                <img src={imgSrc} />

            </GridTile>
        )
    }
}