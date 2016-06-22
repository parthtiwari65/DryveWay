'use strict';

class VerifyThings {

  verifyPlateNumber(plateNumber){
    if (plateNumber.trim().length == 0) {
      return 'Please enter plate number';
    }
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (regExp.test(plateNumber)) {
        return 'Please only alphanumeric characters in plate number';
    }
    return 'correct';
  }
  verifyState(carState){
    if (carState.trim().length == 0) {
      return 'Please enter state';
    }
    var regExpState = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/gi
    if (regExpState.test(carState)) {
        return 'Please only letters in state';
      }
    return 'correct';
  }
}
module.exports = VerifyThings;
