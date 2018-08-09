import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'

const Page = (props) => (
    <div>
        <Button name="Back" onClick={e => props.onClick(e)}>
            <Glyphicon glyph="glyphicon glyphicon-triangle-left"/>
        </Button>
        <Button name="Foward" onClick={e => props.onClick(e)}>
            <Glyphicon glyph="glyphicon glyphicon-triangle-right"/>
        </Button>
    </div>
)
    
export default Page