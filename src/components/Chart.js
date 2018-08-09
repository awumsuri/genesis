import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import React, { PureComponent } from 'react'
import Menu from './Menu'
import parser from '../helpers/csvParser'

class Chart extends PureComponent {

    constructor() {
        super()
        this.currentIndex = 1
        this.page = 1;
    }
    
    state = {
        dataProvider: undefined,
        currentIndex: 1,
        pageSize: 25
    }

    showPage(data) {
        const { currentIndex, pageSize } = this.state

        this.setState({
            dataProvider: data.slice(currentIndex, currentIndex + pageSize)
        })
    }

    parseData(rawData) {
        const data = parser.parseCSV(rawData)

        this.showPage(data)
    }

    loadData(url) {
        const headers = new Headers({
            "Content-Type": "text/csv"
        })

        fetch(url, headers)
            .then((rawData) => rawData.text())
            .then((data) => {
                this.parseData(data)
            })
            .catch((err) => console.error(err))
    }

    componentDidMount() {
        this.loadData('numbers.csv')       
    }

    render() {
        const { dataProvider } = this.state
        const template = dataProvider ? Object.keys(dataProvider[0]).filter(key => key !== "id") : []

        return (
            <div>
                <Menu />
                <BootstrapTable data={dataProvider} stripe hover>
                    <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
                    {
                        template.map(
                            (data) => 
                            <TableHeaderColumn dataField={data}>
                                {data.toUpperCase()}
                            </TableHeaderColumn>
                        )
                    }
                </BootstrapTable>
            </div>
        );
    }
}

export default Chart