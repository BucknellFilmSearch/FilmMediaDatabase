import * as React from 'react';
import Slider from 'react-slick';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import FullscreenDialog from 'material-ui-fullscreen-dialog'


export default class SVGLine extends React.Component {

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
                <line onClick={this.click.bind(this)} x1={this.props.x} x2={this.props.x} y1={this.props.y1} y2={this.props.y2} stroke={"grey"} strokeWidth={3} />
                {/*<line x1="10" x2="100" y1="50" y2="75" stroke={"grey"} strokeWidth={20}/>*/}
            </svg>
        );
    }
}