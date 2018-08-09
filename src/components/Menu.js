import React, { PureComponent } from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'

class Menu extends PureComponent {
    state = {
        csv: undefined
    }


    render() {
        return (
            <div className="menu">
                <SplitButton title="Data Provider" bsStyle="info">
                    <MenuItem eventKey="1">People</MenuItem>
                    <MenuItem eventKey="2">Financial</MenuItem>
                </SplitButton>
            
            </div>
        )
    }
} 

export default Menu