import * as React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';


export default class SVGCircle extends React.Component {

    constructor() {
        super();
        this.state = {
            active: false
        };
    }

    click() {
        this.props.slideTo(this.props.index);
        this.setState(
            {
                active: true
            }
        );
    }

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