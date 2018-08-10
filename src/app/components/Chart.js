import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import React, { PureComponent } from 'react'
import Menu from './Menu'
import parser from '../helpers/csvParser'
import Page from './Page'
import Sort from '../helpers/sort'
import Filter from '../helpers/filter'
import Status from './Status';

class Chart extends PureComponent {

    constructor() {
        super()

        this.currentIndex = 1 //record index
        this.data = undefined //reference to full document in memory
        this.headings = []

        /* Event Handlers */
        this.onClickPageNav = this.onClickPageNav.bind(this)
        this.onDataProviderChange = this.onDataProviderChange.bind(this)
        this.onPageSizeChange = this.onPageSizeChange.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.onSort = this.onSort.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onClearSearch = this.onClearSearch.bind(this)
        
        this.pageSize = 15
        this.cache = new Map()
        this.filtersOptions = {
            string: [
                {value: "1", label:"A - M"}, 
                {value: "2", label: "N - Z"},
                {value: "3", label: "US Only"}
            ],
            number: [ 
                {value: "1", label:"seniors"}, 
                {value: "2", label: "positive float"},
                {value: "3", label: "high debt"}
            ]
        }  
        this.menu = React.createRef()         
    }
    
    state = {
        dataProvider: undefined,
    }

    onSearch(searchTerm) {
        if (searchTerm.length < 3) return

        searchTerm = searchTerm.toLowerCase()
        this.data = this.data.filter(record => Filter("SearchTerm")(record, searchTerm))
        this.showPage()             
    }
    
    onClearSearch() {
        this.resetChart()
        this.showPage()
    }

    onFilterChange(filters) {        
        this.resetChart()

        if(filters.length === 0) {
            this.showPage()
            return 
        }

        this.data = filters.reduce((accum, filter) => {
            accum = this.data.filter(record => Filter(filter.label)(record))
            this.data = accum
            return accum
        }, []) 

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
        this.menu.current.select.current.select.clearValue()
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
        const parseDataObject = parser.parseCSV(rawData)
        const { parsedData, headings, type } = parseDataObject

        this.data = parsedData
        this.headings = headings
        this.type = type
        this.currentKey = url
        this.cache.set(url, parseDataObject)

        this.showPage()
    }

    loadData(url) {
        const headers = new Headers({ "Content-Type": "text/csv" })

        if (this.cache.has(url)) {
            this.currentKey = url
            this.resetChart()
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

    resetChart() {
        const { parsedData, headings, type } = this.cache.get(this.currentKey)

        this.currentIndex = 1;
        this.data = parsedData
        this.headings = headings
        this.type = type
    }

    showPage() {
        const { data, currentIndex, pageSize } = this

        this.setState({ dataProvider: data.slice(currentIndex, currentIndex + pageSize) })
    }

    render() {
        const { dataProvider } = this.state
        this.type = this.currentKey ? this.cache.get(this.currentKey).type : "string"

        return (
            <div>
                <Menu 
                    ref={this.menu}
                    onDataProviderChange={this.onDataProviderChange} 
                    onPageSizeChange={this.onPageSizeChange}
                    onSort={this.onSort}
                    headings={[...this.headings, "id"]}
                    options={this.filtersOptions[this.type]}
                    onFilterChange={this.onFilterChange}
                    onSearch={this.onSearch}
                    onClearSearch={this.onClearSearch}
                    type={this.type}
                />
                <Status dataProvider={dataProvider} />
                <BootstrapTable data={dataProvider} stripe hover>
                    <TableHeaderColumn 
                        isKey width="70" 
                        dataField="id">ID
                    </TableHeaderColumn>
                    {
                        this.headings.map(
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