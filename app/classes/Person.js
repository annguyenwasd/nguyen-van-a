export default class Person {
  fullName = '';

  yearOfBirth = '';

  identifier = '';

  idDate;

  idLocation = '';

  address = '';

  honorific = 'Ông';

  id = Date.now();

  constructor() {
    this.idDate = new Date();
  }
}
