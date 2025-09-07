const products = [
  { id: 1, name: "Bronze Statue", price: 1200, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Antique Vase", price: 850, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Handmade Lamp", price: 1500, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Classic Clock", price: 999, img: "https://via.placeholder.com/200" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  let cartCount = document.getElementById("cart-count");
  let cartTotal = document.getElementById("cart-total");
  let finalTotal = document.getElementById("final-total");
  let cartItems = document.getElementById("cart-items");

  cartCount.textContent = cart.length;
  cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0);
  finalTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0);

  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = $async (params) => {
        {
    }item.name} - ₹${item.price};
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  updateCart();
}

function loadProducts() {
  let productList = document.getElementById("product-list");
  products.forEach(product => {
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = 
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    ;
    productList.appendChild(div);
  {"}"});
{"}"}

window.onload = () ={">"} {
  loadProducts();
  updateCart();
{"}"};