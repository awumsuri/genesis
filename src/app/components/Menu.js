import React, { PureComponent } from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import Find from './Find'

class Menu extends PureComponent {

    constructor() {
        super()
        this.select = React.createRef()
    }

    render() {
        const { props } = this

        return  (<div className="menu">
            <SplitButton title="Page Size" 
                bsStyle="info" 
                key="1" 
                onSelect={e => props.onPageSizeChange(e)}
                id="PageSize"
            >
            {
                [15, 30, 60, 75, 90, 120].map(
                    (sort) => <MenuItem eventKey={sort}>{sort}</MenuItem>
                )
            }
            </SplitButton>

            <SplitButton 
                title="Data Provider" 
                bsStyle="info" 
                key="2"
                onSelect={e => props.onDataProviderChange(e)}
                id="Dataprovider"
            >
                <MenuItem eventKey="1">People</MenuItem>
                <MenuItem eventKey="3">Address</MenuItem>
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
            <Select 
                isMulti={true}
                name="Filters"
                className="filters"
                placeholder="Filters"
                options={props.options}
                onChange={props.onFilterChange}
                ref={this.select}
            />
            {
            props.type === "string" && 
            <Find 
                className="find" 
                onSearch={props.onSearch}
                onClearSearch={props.onClearSearch}
            />
            }
        </div>)

    }
 }

export default Menu