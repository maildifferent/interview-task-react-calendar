export function stringFromEventKey(event) {
  if (typeof event.year !== 'number') throw new Error()
  if (typeof event.month !== 'number') throw new Error()
  if (typeof event.date !== 'number') throw new Error()

  return `${event.year}-${event.month}-${event.date}-${event.hour}`
}