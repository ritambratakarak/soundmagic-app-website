export function convertToUTC(date) {

    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    console.log('date...',utcDate)
    return utcDate
  }