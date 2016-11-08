import * as React from "react";
import {DEBUG_MODE} from "../app";

export class ScreenshotWithCaption extends React.Component<ScreenshotWithCaptionI, {}> {
    constructor(props: ScreenshotWithCaptionI) {
        super(props);
    }

    render() {
        var movieOclcId = this.props.screenshotsWithCaptions.movieOclcId;
        return (
            <div>
                {this.props.screenshotsWithCaptions.results.map(function(object: any)
                    {
                        return (
                            <a href="/moviesearch/context/168630200/659/phone/All/1996/2016/2" className="list-group-item">
                                <img className='thumbnail' style={{margin: "auto"}} src={DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + object.movieLineNumber + ".png"} width='720' height='480' />
                                <p className="list-group-item-text">Line #{ object.movieLineNumber }</p>
                                <p className="list-group-item-text">From { object.movieStartTimeStamp } to { object.movieEndTimeStamp }</p>
                                <p className="list-group-item-text"> { object.movieLineText } </p>
                            </a>
                        )
                    }
                )}
            </div>
        )
    }
}