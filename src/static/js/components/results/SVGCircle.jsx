import * as React from 'react';
import Slider from 'react-slick';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import FullscreenDialog from 'material-ui-fullscreen-dialog'


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
                {/*<line x1="10" x2="100" y1="50" y2="75" stroke={"grey"} strokeWidth={20}/>*/}
            </svg>
        );
    }
}