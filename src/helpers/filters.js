function filterString (a, b) {
    if (a[this.sortField].toLowerCase() < b[this.sortField].toLowerCase()) {
        return -1
    }

    if (a[this.sortField].toLowerCase() > b[this.sortField].toLowerCase()) {
        return 1
    }

    return 0
}

function filter (a, b) {
    if (a[this.sortField] < b[this.sortField]) {
        return -1
    }

    if (a[this.sortField] > b[this.sortField]) {
        return 1
    }

    return 0
}

export default { filter, filterString}