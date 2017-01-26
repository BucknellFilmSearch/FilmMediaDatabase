import * as React from "react";
import Drawer from 'material-ui/Drawer';

export class MetadataDrawer extends React.Component<any, any> {
    render() {
        return (
            <Drawer docked={true} open={true} openSecondary={true} zDepth={2}>
                Metadata
            </Drawer>
        )
    }
}