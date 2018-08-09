import React from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'

const Menu = (props) => (
    <div className="menu">
        <Select 
            isMulti={true}
            name="Filters"
            className="filters"
            placeholder="Filters"
            options={options}
        >
            
        </Select>
        <SplitButton title="Page Size" 
            bsStyle="info" 
            key="1" 
            onSelect={e => props.onPageSizeChange(e)}
            id="PageSize"
        >
            <MenuItem eventKey="15">15</MenuItem>
            <MenuItem eventKey="30">30</MenuItem>
            <MenuItem eventKey="60">60</MenuItem>
            <MenuItem eventKey="75">75</MenuItem>
            <MenuItem eventKey="90">90</MenuItem>
            <MenuItem eventKey="120">120</MenuItem>
        </SplitButton>

        <SplitButton 
            title="Data Provider" 
            bsStyle="info" 
            key="2" 
            onSelect={e => props.onDataProviderChange(e)}
            id="Dataprovider"
        >
            <MenuItem eventKey="1">People</MenuItem>
            <MenuItem eventKey="2">Financial</MenuItem>
        </SplitButton>

        <SplitButton 
            title="Sort" 
            headings={props.headings} 
            bsStyle="info" 
            key="3" 
            onSelect={e => props.onSort(e)}
            id="Sort"
        >
            {
                props.headings.map(
                    (heading) => <MenuItem eventKey={heading}>{heading}</MenuItem>
                )
            }
        </SplitButton>

      
    </div>
)

export default Menu