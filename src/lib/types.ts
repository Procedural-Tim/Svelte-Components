export type Data = {
    x: string | number,
    y: string | number,
    z?: string | number,
    xLabel?: string,
    yLabel?: string,
    zLabel?: string,
    metaData?: Object,
}

export type DataSet = Array<Data>;