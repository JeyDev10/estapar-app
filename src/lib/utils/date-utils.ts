export const dateUtils = {
  transformStringToDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number)

    return new Date(year, month - 1, day)
  },
  validateDateString(dateString: string) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!regex.test(dateString)) {
      return false
    }
    const parts = dateString.split("/")
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)

    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day
  }
}
