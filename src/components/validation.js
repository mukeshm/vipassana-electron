module.exports = {
  isCourseNameValid(name, self) {
    if (name === '' || name.length > 25) {
      self.setState({nameClass: 'inputText errorInput'})
      return false
    }
    return true
  },

  isDateValid(date, self) {
    if (date === '') {
      self.setState({dateClass: 'inputText errorInput'})
      return false
    }
    return true
  },

  isDurationValid(duration, self) {
    if (duration <= 0) {
      self.setState({durationClass: 'inputText errorInput'})
      return false
    }
    return true
  }
}
