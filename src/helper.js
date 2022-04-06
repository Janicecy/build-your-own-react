export const isEvent = key => key.startsWith("on")

export const isProperty = key => key !== 'children' && !isEvent(key)

export const isGone = (prev, next) => key => !(key in next)

export const isNew = (prev, next) => key => next[key] !== prev[key]