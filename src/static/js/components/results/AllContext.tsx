import * as React from "react";

import {ScreenshotWithCaption} from "./ScreenshotWithCaption";

export class AllContext extends React.Component<any, any> {
    constructor() {
        super();

        this.state = null;
    }

    loadData(pathname: string) {
        $.getJSON('http://localhost:8080/moviesearch' + pathname,  (data: any) => {
            this.state = {
                context: data.results
            };

            // TODO - move this up so that a parent component delegates rendering to a child component
            this.forceUpdate();
        });
    }

    componentDidMount() {
        this.loadData(this.props.location.pathname);
    }


    // TODO - implement this method in case new search terms are submitted and this component needs to rerendered
    componentWillReceiveProps(nextProps: any) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.loadData(nextProps.props.location.pathname);
        }
    }


    render () {
        if (this.state) {
            var dataToPass = {
                results: this.state.context,
                movieOclcId: this.props.routeParams.oclc
            };

            return <ScreenshotWithCaption screenshotsWithCaptions={dataToPass} fromContext={true} />;
        }
        else {
            return (
                <div>
                    <h2>Loading Context...</h2>
                </div>
            )
        }

    }
}