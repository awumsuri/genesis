import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

const Page = (props) => (
    <div className="page-btn">
        <Button name="Back" onClick={e => props.onClick(e)} bsStyle="info">
            <Glyphicon glyph="glyphicon glyphicon-triangle-left"/>
        </Button>
        <Button name="Forward" onClick={e => props.onClick(e)} bsStyle="info">
            <Glyphicon glyph="glyphicon glyphicon-triangle-right"/>
        </Button>
    </div>
)
    
export default Page