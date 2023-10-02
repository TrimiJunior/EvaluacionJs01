class Shopping_Record {
  constructor(_name) {
    let name = _name;
    let purchases = new Array();

    this.getName = () => name;
    this.getPurchases = () => purchases;
  }

  add_purchase = (purchase) => this.getPurchases().push(purchase);

  edit_purchase(id, new_product_amount) {
    index = this.find();
    if (index != -1)
      this.getPurchases()[index].setProduct_amount(new_product_amount);
  }

  delete_purchase(id) {
    let index = this.find(id);
    if (index != -1) this.getPurchases().splice(index, 1);
  }

  find(id) {
    let index = -1;
    let i = 0;
    while (index == -1 && i < this.getPurchases().length) {
      if (id == this.getPurchases()[i].getId()) {
        index = i;
      }
      i++;
    }
    return index;
  }
  total_cost() {
    let sum = 0;
    for (let k in this.getPurchases()) {
      sum += this.getPurchases()[k].purchase_cost();
    }
    return sum;
  }
}
class Purchase {
  constructor(_id) {
    let id = _id;
    let product_amount = new Array();

    this.getId = () => id;
    this.getProduct_amount = () => product_amount;

    this.setProduct_amount = function (new_product_amount) {
      product_amount = new_product_amount;
    };
  }

  add_products = (product, amount) =>
    this.getProduct_amount().push([product, amount]);

  purchase_cost() {
    let total_cost = 0;
    let aux = 0;
    for (let i in this.getProduct_amount())
      for (let j in this.getProduct_amount()[i]) {
        if (this.getProduct_amount()[i][j] instanceof Product) {
          aux = this.getProduct_amount()[i][j].getPrice();
        } else {
          total_cost += aux * this.getProduct_amount()[i][j];
        }
      }
    return total_cost;
  }
}

class Product {
  constructor(_name, _price) {
    let name = _name;
    let price = _price;

    this.getName = () => name;
    this.getPrice = () => price;
  }
}

const product1 = new Product("Azucar", 10);     //instancear productos con su nombre y precio
const product2 = new Product("Leche", 20);
const product3 = new Product("Arroz", 15);

const purchase1 = new Purchase("no1");      //instancear compras con su identificador
const purchase2 = new Purchase("no2");
const purchase3 = new Purchase("no3");

purchase1.add_products(product1, 10);       //añadir productos con la cantidad a las compras
purchase1.add_products(product2, 5);
purchase2.add_products(product3, 7);

shopping_record = new Shopping_Record("5ta y 42");       //instancear rigistro de compras con su nombre
shopping_record.add_purchase(purchase1);        //añadir compras
shopping_record.add_purchase(purchase2);
shopping_record.add_purchase(purchase3);

console.log(shopping_record.getPurchases().length);

shopping_record.delete_purchase("no3");     //eliminar la compra con ese identificador

console.log(shopping_record.getPurchases().length);

console.log(shopping_record.total_cost());      // calacular el costo total en compras
