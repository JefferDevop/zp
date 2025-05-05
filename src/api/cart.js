import { forEach } from "lodash";
import { CART } from "../config/constants";

export class Cart {
  add(itemId, quantity, talla, maxQuantity) {
    const products = this.getAll();
    const code = itemId + talla+talla;

    const objIndex = products.findIndex((product) => product.code === code);

    // if (objIndex < 0) {});

      products.push({
        id: itemId,
        code,
        quantity,
        talla,
      });
      
    // } else {
    //   const product = products[objIndex];
    //   products[objIndex].quantity = product.quantity + quantity;
    // }

    localStorage.setItem(CART, JSON.stringify(products));
  }

  decrease(itemId) {
  
    const products = this.getAll();

    const objIndex = products.findIndex((product) => product.code === itemId);

    if (objIndex >= 0) {
      const product = products[objIndex];
      if (product.quantity > 1) {
        products[objIndex].quantity = product.quantity - 1;
        localStorage.setItem(CART, JSON.stringify(products));
      } else {
        this.delete(itemId);
      }
    }
  }

  increment(itemId) {
    const products = this.getAll();

    const objIndex = products.findIndex((product) => product.code === itemId);

    if (objIndex >= 0) {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + 1;
      localStorage.setItem(CART, JSON.stringify(products));
    }
  }

  delete(itemId) {
    const products = this.getAll();
    const objIndex = products.filter((product) => product.code !== itemId);
    localStorage.setItem(CART, JSON.stringify(objIndex));
  }

  getAll() {
    const response = localStorage.getItem(CART);
    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  deleteAll(){
    localStorage.removeItem(CART);
  }


  count() {
    let count = 0;
    const response = this.getAll();

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }
}
