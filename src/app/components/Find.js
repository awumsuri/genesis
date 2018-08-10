import React, { PureComponent } from 'react'
import { FormControl } from 'react-bootstrap'

class Find extends PureComponent {

    state = {
        value: ''
    }

    onChange(event) {
        if (this.state.value.length <= 1) {
            this.props.onClearSearch()
        }

        this.setState({
            value: event.target.value
        })
    }

    onEnterHandler(e) {
        if(e.key === 'Enter') {
            this.props.onSearch(this.state.value)
        }
    }

    render() {
        return (
            <div className="find">
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Search All Fields"
                        onChange={this.onChange.bind(this)}
                        onKeyPress={this.onEnterHandler.bind(this)}
                     >
                    </FormControl>
            </div>
       )

    }
}

export default Find