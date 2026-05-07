// JS program

const products = [
    {id:1, name:"Laptop", price:25000, image:"💻"},
    {id:2, name:"Phone", price:12000, image:"📱"},
    {id:3, name:"Headset", price:1500, image:"🎧"},
    {id:4, name:"Keyboard", price:1000, image:"⌨️"},
    {id:5, name:"Mouse", price:700, image:"🖱️"},
    {id:6, name:"Camera", price:8000, image:"📷"}
];

let cart = [];

function displayProducts(){
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {

        let inCart = cart.find(item => item.id === product.id);

        productList.innerHTML += `
        <div class="product-card">
            <h1>${product.image}</h1>
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>
            <button onclick="addToCart(${product.id})"
            ${inCart ? "disabled" : ""}>
            ${inCart ? "Already in Cart" : "Add to Cart"}
            </button>
        </div>
        `;
    });
}

function addToCart(id){
    const product = products.find(item => item.id === id);

    cart.push({
        ...product,
        quantity:1
    });

    updateCart();
}

function updateCart(){
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;
        total += subtotal;
        count += item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">
            <strong>${item.name}</strong><br>
            ₱${item.price} x ${item.quantity} = ₱${subtotal}<br>

            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
        `;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;

    displayProducts();
}

function changeQty(id, value){
    let item = cart.find(product => product.id === id);

    item.quantity += value;

    if(item.quantity <= 0){
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

function removeItem(id){
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function clearCart(){
    cart = [];
    updateCart();
}

function checkout(){
    alert("Checkout successful!");
}

function Pushtoorder () {
    alert ("Product has been successfully ordered!");
}

displayProducts();
updateCart();