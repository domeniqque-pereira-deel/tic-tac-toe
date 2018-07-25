
export const clone = object => JSON.parse(JSON.stringify(object))

export const isEmpty = item => Object.keys(item).length === 0

export const getRandomIndexOf = list => Math.floor(Math.random() * list.length)

export const randomItem = list => list[getRandomIndexOf(list)]

export const getStorage = key => window.localStorage.getItem(key)

export const setStorage = (key, value) => {
  window.localStorage.setItem(key, value)
  return value
}

/**
  Returns a list with the indexes when the value is the same as desired
*/
export function keysWhereValue (value, obk) {
  return Object.keys(obk)
    .reduce((acc, key) =>
      obk[key] === value ? acc.concat([parseInt(key)]) : acc, [])
}
