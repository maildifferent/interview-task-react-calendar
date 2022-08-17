export function isEventsKeysEqual(event1, event2) {
  if (typeof event1.year !== 'number') return false
  if (typeof event1.month !== 'number') return false
  if (typeof event1.date !== 'number') return false
  if (typeof event1.hour !== 'number') return false

  if (typeof event2.year !== 'number') return false
  if (typeof event2.month !== 'number') return false
  if (typeof event2.date !== 'number') return false
  if (typeof event2.hour !== 'number') return false

  return event1.year === event2.year
    && event1.month === event2.month
    && event1.date === event2.date
    && event1.hour === event2.hour
}