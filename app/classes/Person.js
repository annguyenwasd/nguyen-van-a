export default class Person {
  fullName = '';

  fullNameCap = '';

  yearOfBirth = '';

  identifier = '';

  idDate;

  idLocation = '';

  address = '';

  honorific = 'Ông';

  houseNumber = '';

  district = '';

  city = '';

  id = Date.now();

  constructor() {
    this.idDate = new Date();
  }
}
