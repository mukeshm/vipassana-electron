module.exports = {

    isNumberValid(num, max){
        if (num <= 0 || num > max) {
        return false
     }
     return true
    },

    isNameValid(name){
        if (name === '' || name === null) {
            return false
        }
        return true
    }
}