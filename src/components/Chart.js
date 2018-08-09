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
        this.onDataProviderChange = this.onDataProviderChange.bind(this)
        this.onPageSizeChange = this.onPageSizeChange.bind(this)
        this.onSort = this.onSort.bind(this)
        this.pageSize = 15
        this.cache = new Map()
        this.filters = []     
    }
    
    state = {
        dataProvider: undefined,
    }

    onPageSizeChange(event) {
        this.pageSize = parseInt(event, 10)
        this.showPage()
    }

    onDataProviderChange(key) {
        switch(key) {
            case "2":
                this.loadData("numbers.csv")
                break
            case "1":
                this.loadData("people.csv")
                break
            default: 
                break;
        }
    }

    onClickPage(event) {
        const { name } = event.target
        const { pageSize, data, currentIndex } = this
        let pageCheck = 0;

        switch(name) {
            case "Back":
                pageCheck = currentIndex - pageSize
                this.currentIndex = pageCheck > 0 ? pageCheck : 1
                break                
            case "Forward":
                pageCheck = currentIndex + pageSize
                this.currentIndex = pageCheck > data.length-1 ? currentIndex : pageCheck 
                break
            default:
                break                
        }

        this.showPage()
    }

    onSort(event) {
        const sortField = event
        const testField = this.data[1][sortField]

        if (typeof testField === "string") {
            this.data.sort((a, b) => {
                if (a[sortField].toLowerCase() < b[sortField].toLowerCase()) 
                    return -1
                if (a[sortField].toLowerCase() > b[sortField].toLowerCase())
                    return 1
                return 0
            })            
        } else {
            this.data.sort((a, b) => {
                if (a[sortField] < b[sortField])
                    return -1
                if (a[sortField]> b[sortField])
                    return 1
                return 0
            })
        }
        
        this.currentIndex = 1
        this.showPage()
    }

    showPage() {
        const { data, currentIndex, pageSize } = this
        this.setState({
            dataProvider: data.slice(currentIndex, currentIndex + pageSize)
        })
    }

    parseData(url, rawData) {
        this.data = parser.parseCSV(rawData)
        this.cache.set(url, this.data)
        this.showPage()
    }

    loadData(url) {
        const headers = new Headers({
            "Content-Type": "text/csv"
        })

        if (this.cache.has(url)) {
            this.data = this.cache.get(url)
            this.showPage()
            return
        }

        fetch(url, headers)
            .then((rawData) => rawData.text())
            .then((data) => {
                this.parseData(url, data)
            })
            .catch((err) => console.error(err))
    }

    componentDidMount() {
        this.loadData('people.csv')       
    }

    render() {
        const { dataProvider } = this.state
        const headers = dataProvider ? Object.keys(dataProvider[0]).filter(key => key !== "id") : []

        return (
            <div>
                <Menu 
                    onDataProviderChange={this.onDataProviderChange} 
                    onPageSizeChange={this.onPageSizeChange}
                    onSort={this.onSort}
                    headings={[...headers, "id"]}
                />
                <BootstrapTable data={dataProvider} stripe hover>
                    <TableHeaderColumn isKey width="70" dataField="id">ID</TableHeaderColumn>
                    {
                        headers.map(
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