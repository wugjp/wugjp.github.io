export const dateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0].replaceAll('-', '.')
}

export const numToYYYYMMDD = (year: number, month: number, day: number): string => {
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const numToMMDD = (month: number, day: number): string => {
  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const timestampToJSTString = (utcTimestampSec: number): string => {
  return new Date(utcTimestampSec * 1000 + 9 * 60 * 60 * 1000).toISOString().replace('T', ' ').replace('Z', '').slice(0, 19)
}

export const ISO8601toJPDateTimeStr = (date: Date): string => {
  return timestampToJSTString(new Date(date).getTime())
}
