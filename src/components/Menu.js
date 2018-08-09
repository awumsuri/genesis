import React, { PureComponent } from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'

const Menu = (props) => (
    <div className="menu">
        <SplitButton title="Page Size" bsStyle="info" key="1" onSelect={e => props.onPageSizeChange(e)}>
            <MenuItem eventKey="15">15</MenuItem>
            <MenuItem eventKey="30">30</MenuItem>
            <MenuItem eventKey="60">60</MenuItem>
            <MenuItem eventKey="75">75</MenuItem>
            <MenuItem eventKey="90">90</MenuItem>
            <MenuItem eventKey="120">120</MenuItem>
        </SplitButton>
        <SplitButton title="Data Provider" bsStyle="info" key="2" onSelect={e => props.onDataProviderChange(e)}>
            <MenuItem eventKey="1">People</MenuItem>
            <MenuItem eventKey="2">Financial</MenuItem>
        </SplitButton>
    </div>
)

export default Menu