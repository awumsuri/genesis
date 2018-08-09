import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import React, { PureComponent } from 'react'
import Menu from './Menu'
import parser from '../helpers/csvParser'
import Page from './Page'

class Chart extends PureComponent {

    constructor() {
        super()
        this.currentIndex = 1
        this.page = 1;
        this.data = []
        this.onClickPage = this.onClickPage.bind(this)
    }
    
    state = {
        dataProvider: undefined,
        pageSize: 15
    }

    onClickPage(event) {
        const { name } = event.target
        const { pageSize } = this.state
        let pageCheck = 0;

        switch(name) {
            case "Back":
                pageCheck = this.currentIndex - pageSize
                this.currentIndex = pageCheck > 0 ? pageCheck : 1
            break;                
            case "Forward":
                pageCheck = this.currentIndex + pageSize
                this.currentIndex = pageCheck > this.data.length-1 ? this.currentIndex : pageCheck 
            break;                
        }

        this.showPage()
    }

    showPage() {
        const { pageSize } = this.state

        this.setState({
            dataProvider: this.data.slice(this.currentIndex, this.currentIndex + pageSize)
        })
    }

    parseData(rawData) {
        this.data = parser.parseCSV(rawData)

        this.showPage()
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
        this.loadData('people.csv')       
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
                <Page onClick={this.onClickPage} />
            </div>
        );
    }
}

export default Chart