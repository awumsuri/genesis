function filters (filter) {
    switch(filter) {
        case "seniors":
            return (record) => record.age > 60
        default:
            return record => record
    }
}

export default filters