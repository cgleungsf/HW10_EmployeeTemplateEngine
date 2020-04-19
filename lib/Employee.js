// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
  }
  
  // const toys = [
  //   new Toy("Action Figure", 14.99, 5),
  //   new Toy("Rare Toy", 17.99, 1)
  // ];
  // SAME THING 
  const actionFigure = new Toy("Action Figure", 14.99, 5)
  const rareToy = new Toy ("Rare Toy", 17.99, 1)
  const doll = new Toy ("Doll",5.99,3)
  const toys = [ actionFigure, rareToy, doll ];
  
  
  module.exports = {
    Toy,
    toys
  };