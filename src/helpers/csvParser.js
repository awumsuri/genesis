export const parseCSV = (rawData) => {
    const seperateData = rawData.replace("\r","").split("\n")
    const headings = seperateData[0].split(",")

    return seperateData.map((data, dataIndex) => {
        const dataArray = data.split(",")

        return headings.reduce((accum, curr, index) => (
            {
                ...accum,
                [curr]: dataArray[index],
                id: dataIndex
            }            
        ), {})
    })
}

export default { parseCSV }