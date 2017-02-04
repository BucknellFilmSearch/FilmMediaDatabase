var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "../../app"], function (require, exports, React, app_1) {
    "use strict";
    var ScreenshotWithCaption = (function (_super) {
        __extends(ScreenshotWithCaption, _super);
        function ScreenshotWithCaption() {
            _super.apply(this, arguments);
        }
        ScreenshotWithCaption.prototype.render = function () {
            var movieOclcId = this.props.movieOclcId;
            return (React.createElement("div", null, React.createElement("img", {className: 'thumbnail', style: { margin: "auto" }, src: app_1.DEBUG_MODE ? "/static/imageFiles/720x480.jpg" : "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + movieOclcId + "/" + this.props.screenshotWithCaption.movieLineNumber + ".png", width: '720', height: '480'}), React.createElement("p", {className: "list-group-item-text"}, "Line #", this.props.screenshotWithCaption.movieLineNumber), React.createElement("p", {className: "list-group-item-text"}, "From ", this.props.screenshotWithCaption.movieStartTimeStamp, "to ", this.props.screenshotWithCaption.movieEndTimeStamp), React.createElement("p", {className: "list-group-item-text"}, " ", this.props.screenshotWithCaption.movieLineText, " ")));
        };
        return ScreenshotWithCaption;
    }(React.Component));
    exports.ScreenshotWithCaption = ScreenshotWithCaption;
});
//# sourceMappingURL=ScreenshotWithCaption.js.map