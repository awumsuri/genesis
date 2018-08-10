function filters (filter) {
    switch(filter) {
        case "seniors":
            return (record) => record.age > 60
        case "positive float":
            return (record) => record.float > 0
        case "high debt":
            return (record) => record.dollar > 9900
        case "US Only":
            return (record) => record.country === "US"
        case "A - M":
            return (record) => record.first.charAt(0) >= 'A' && record.first.charAt(0) <= 'M'
        case "N - Z":
            return (record) => record.first.charAt(0) >= 'N' && record.first.charAt(0) <= 'Z'
        case "SearchTerm":
            return (record, searchTerm, searchFields) => {
                for (const field of searchFields) {
                    return record[field].toLowerCase().indexOf(searchTerm) !== -1
                }
            }
        default:
            return record => true
    }
}

export default filters