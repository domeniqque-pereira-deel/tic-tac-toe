
export const clone = object => JSON.parse(JSON.stringify(object))

export const isEmpty = item => Object.keys(item).length === 0
