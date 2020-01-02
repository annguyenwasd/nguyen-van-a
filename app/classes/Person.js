export default class Person {
  fullName = '';

  fullNameCap = '';

  yearOfBirth = '';

  identifier = '';

  idDate = new Date();

  idLocation = '';

  address = '';

  honorific = 'Ông';

  houseNumber = '';

  district = '';

  city = '';

  constructor() {
    this.idDate = new Date();
  }
}
