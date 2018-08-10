import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import React, { PureComponent } from 'react'
import Menu from './Menu'
import parser from '../helpers/csvParser'
import Page from './Page'
import Sort from '../helpers/sort'
import Filter from '../helpers/filter'

class Chart extends PureComponent {

    constructor() {
        super()

        this.currentIndex = 1 //record index
        this.data = undefined //reference to full document in memory

        /* Event Handlers */
        this.onClickPageNav = this.onClickPageNav.bind(this)
        this.onDataProviderChange = this.onDataProviderChange.bind(this)
        this.onPageSizeChange = this.onPageSizeChange.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)


        this.onSort = this.onSort.bind(this)
        this.pageSize = 15
        this.cache = new Map()
        this.filtersOptions = {
            string: [],
            number: [
                {value:"record.age > 40", label:"seniors"}, 
                { value:"record.float > 0", label: "float > 0"}
            ]
        }           
    }
    
    state = {
        dataProvider: undefined,
    }

    onFilterChange(filters) {
        this.data = this.cache.get(this.currentKey)        
        const filteredData = filters.map(filter => 
            this.data.filter(record => Filter(filter.label)(record)
        )) 

        this.data = filteredData[0]
        this.currentIndex = 1

        this.showPage()
    }

    onPageSizeChange(event) {
        this.pageSize = parseInt(event, 10)
        this.showPage()
    }

    onDataProviderChange(key) {
        switch(key) {
            case "1":
                this.loadData("people.csv")
                break
            case "2":
                this.loadData("numbers.csv")
                break
            default: 
                break;
        }
    }

    onClickPageNav(event) {
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
        this.sortField = event
        const sortFunction = (this.sortField !== "id" && this.type === "string") ? 
                                Sort.sortString.bind(this) : Sort.sortNumber.bind(this)

        this.data.sort(sortFunction)
        
        this.currentIndex = 1
        this.showPage()
    }

   

    parseData(url, rawData) {
        this.data = parser.parseCSV(rawData)
        this.currentKey = url
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

    getType(dataProvider, headers) {
        return dataProvider ? ( Number.isNaN(parseInt(dataProvider[1][headers[0]], 10)) )  ? "string" : "number" : "string"
    }

    getHeaders() {
        return this.data ? Object.keys(this.data[0]).filter(key => key !== "id") : []
    }

    showPage() {
        const { data, currentIndex, pageSize } = this

        this.setState({ dataProvider: data.slice(currentIndex, currentIndex + pageSize) })
    }

    render() {
        const { dataProvider } = this.state
        const headers = this.getHeaders(dataProvider)
        this.type = this.getType(dataProvider, headers)

        return (
            <div>
                <Menu 
                    onDataProviderChange={this.onDataProviderChange} 
                    onPageSizeChange={this.onPageSizeChange}
                    onSort={this.onSort}
                    headings={[...headers, "id"]}
                    options={this.filtersOptions[this.type]}
                    onFilterChange={this.onFilterChange}
                />
                <BootstrapTable data={dataProvider} stripe hover>
                    <TableHeaderColumn 
                        isKey width="70" 
                        dataField="id">ID
                    </TableHeaderColumn>
                    {
                        headers.map(
                            (data) => 
                            <TableHeaderColumn dataField={data}>
                                {data.toUpperCase()}
                            </TableHeaderColumn>
                        )
                    }
                </BootstrapTable>
                <Page onClick={this.onClickPageNav} />
            </div>
        );
    }
}

export default Chart