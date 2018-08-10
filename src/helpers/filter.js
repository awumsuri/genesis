function filters (filter) {
    switch(filter) {
        case "seniors":
            return (record) => record.age > 60
        case "positive float":
            return (record) => record.float > 0
        case "high debt":
            return (record) => record.dollar > 9900
        default:
            return record => true
    }
}

export default filters