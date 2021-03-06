export const parseCSV = (rawData) => {
    const seperateData = rawData.split("\r\n")
    const headings = seperateData[0].split(",")
    const dataOnly = seperateData.slice(1, seperateData.length)

    const parsedData = dataOnly.map((data, dataIndex) => {
        const dataArray = data.split(",")

        return headings.reduce((accum, curr, index) => (
            {
                ...accum,
                [curr]: parse(dataArray[index]),
                id: dataIndex + 1
            }            
        ), {})
    })

    return {
        parsedData, 
        headings,
        type: typeof parsedData[1][headings[1]]
    }
}

const parse = data => {
    const parsedData = parseInt(data, 10)

    return Number.isNaN(parsedData) ? data : parsedData 
}

export default { parseCSV }