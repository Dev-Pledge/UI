export const propOrDefault = (obj, propertyName, defaultsTo = null) => {
  return obj.hasOwnProperty(propertyName) ? obj[propertyName] : defaultsTo
}

export const hasProp = (obj, propertyName) => {
  return obj.hasOwnProperty(propertyName)
}