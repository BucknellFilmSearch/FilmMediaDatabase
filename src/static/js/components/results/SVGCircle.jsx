/**
 * Provides a circle used in the timeline in ContextDialog.
 */

import * as React from 'react';

/**
* The SVGCirle is a wrapper class that adds additional functionality to a
* SVG circle element, such as: linking the circle element to a specific
* screenshot in the current film and making their onClick functionality
* cause the image gallery in ContextDialogue to scroll to that linked
* screenshot.
*/
export default class SVGCircle extends React.Component {

    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    /**
     * Slides the image gallery to the linked screenshot.
     */
    click() {
        this.props.slideTo(this.props.index);
        this.setState(
            {
                active: true
            }
        );
    }

    /**
     * Render the svg circle.
     */
    render() {
        return(
            <svg>
                <circle
                    className="timelineCircles"
                    onClick={this.click.bind(this)}
                    cx={this.props.x}
                    cy={this.props.y}
                    r={this.props.radius}
                    stroke={"#6097b2"}
                    strokeWidth={2}
                    data-tip data-for={'SVGCircle' + this.props.index}
                    fill={"#afe5ff"}
                    fillOpacity={0}/>
            </svg>
        );
    }
}