/// <amd-dependency path="static/js/jquery.flot.min.js" />

import * as React from "react";
//import $ = require("jquery");
// import * as $ from "jquery.flot.min.js";


export class Graph extends React.Component<any, {}> {
    componentDidMount() {


        var d1 = [[1996,100],[1997,0],[1998,0],[1999,0],[2000,0],[2001,100],[2002,100],[2003,100],[2004,100],[2005,100],[2006,100],[2007,100],[2008,87],[2009,66],[2010,80],[2011,83],[2012,100],[2013,61],[2014,72],[2015,0],[2016,0]];

        $.plot("#placeholder", [d1],
            {
            lines:{show:true},
            points:{show:true},
            xaxis:{tickDecimals:0,tickSize:1,color:'#fff',tickColor:'#fff',font:'#fff'},
            yaxis:{min:0,max:100,tickDecimals:0,tickSize:10,color:'#fff',tickColor:'#fff',font:'#fff'}
        });

        // Add the Flot version string to the footer

        $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
    }

    render() {
        return (
            <div id="graph">

                <div id="content">

                    <div><p class="inner cover">
                        <p class="lead">
                            <div id="header"><h4>Percentage Of Movies Containing Your Search Term (By Original Release Year)</h4></div>
                            <div id="placeholder" ></div>
                        </p>
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}