export default class LandType {
  name;

  square;

  id = Date.now();

  constructure(name, square) {
    this.name = name;
    this.square = square;
  }
}
