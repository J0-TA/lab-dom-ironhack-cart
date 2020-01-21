let $cart = document.querySelector('#cart tbody');
let $calc = document.getElementById('calc');

// Here I set an onchange function who calculates the subtotal when qty input field
// changes and print it in the HTML

function setOnChanges () {
  let price, rowSubtotal;
  document.querySelectorAll(`.product`).forEach(product => { 
    product.querySelector(`.qty label input`).onchange = function (e) {
      price = +product.querySelector(`.pu span`).innerText;
      rowSubtotal = +(e.target.value * price).toFixed(2);
      product.querySelector(`.subtot span`).innerHTML = rowSubtotal;
    };
  });
}
setOnChanges ()

//Here I define a function who paint a new row from the DOM and give the properties of the other product's rows.

function setCreate () {
  document.querySelector(`#create`).onclick = function () {
    let cartNewElement = document.createElement("tr")
    cartNewElement.className = "product";
    cartNewElement.innerHTML = `<td class="name"><span>${document.querySelector(`.text input`).value}</span></td>
    <td class="pu"><span>$</span>${parseFloat(document.querySelector(`.number input`).value).toFixed(2)}</span></td>
    <td class="qty"><label><input type="number" value="0" min="0"/></label></td>
    <td class="subtot">$<span></span></td>
    <td class="rm"><button class="btn btn-delete">Delete</button></td>`
    $cart.appendChild(cartNewElement);
    setOnChanges ()
    setDelete ()
  } 
} 
setCreate()

// Here a I define a function to give de delete buttons the capacity to delete his own row.

function setDelete () {
  let rowToDelete
  document.querySelectorAll(`.pruduct`).forEach(product => {
    product.querySelector(`.btn btn-delete`).onclick = function (e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
    }
  })
}
setDelete ()

// Here I calculate all the amounts together.

function calcAll() {
  let price = 0;
  let productPrice, productQty, rowSubtotal;
  
  document.querySelectorAll(`.product`).forEach(product => {
  productPrice = +product.querySelector(`.pu span`).innerText;
  productQty = product.querySelector(`.qty label input`).value;
  rowSubtotal = productPrice * productQty;
  product.querySelector(`.subtotal`).innerHTML = `${rowSubtotal}$`;
  price += rowSubtotal;
  });
  document.querySelector(`h2 span`).innerHTML = `${price}`;
}

$calc.onclick = calcAll();