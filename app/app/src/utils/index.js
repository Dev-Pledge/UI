export const propOrDefault = (obj, propertyName, defaultsTo = null) => {
  return obj.hasOwnProperty(propertyName) ? obj[propertyName] : defaultsTo
}

export const hasProp = (obj, propertyName) => {
  return obj.hasOwnProperty(propertyName)
}

export const limitLength = (str = '', limit = 400, etcString = '...') => {
  return str.length <= limit ? str : str.substr(0, limit) + etcString
}