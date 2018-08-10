import React, { PureComponent } from 'react'

class Status extends PureComponent {
    getNumberPages() {
        return Math.ceil(this.props.records/(this.props.pageSize))
    }

    getPageNumber() {
        return Math.floor((this.props.records + this.props.pageSize) / this.props.pageSize)
    }

    render() {
        return(
            <div className="status">
                <div><span>Page {this.getPageNumber()} of {this.getNumberPages()} </span></div>
                <div><span> Total Displayed Records </span><span className="displayed-records">{this.props.pages}</span></div>
            </div>
        )
    }
}

export default Status