const products = [
    // العطور
    { id: 1, name: "عطر Sauvage Dior", price: 18500, category: "perfumes", img: "sauvage.png" },
    { id: 2, name: "عطر Blue Chanel", price: 21000, category: "perfumes", img: "chanel.png" },
    { id: 3, name: "عطر Creed Aventus", price: 45000, category: "perfumes", img: "creed.png" },
    { id: 4, name: "عطر Eros Versace", price: 16000, category: "perfumes", img: "eros.png" },
    // التقنية
    { id: 5, name: "iPhone 15 Pro Max", price: 215000, category: "tech", img: "iphone.png" },
    { id: 6, name: "Samsung S24 Ultra", price: 195000, category: "tech", img: "s24.png" },
    { id: 7, name: "MacBook Pro M3", price: 380000, category: "tech", img: "macbook.png" },
    // الجيمنج
    { id: 8, name: "PlayStation 5 Slim", price: 112000, category: "gaming", img: "ps5.png" },
    { id: 9, name: "Razer Viper Mouse", price: 13500, category: "gaming", img: "mouse.png" },
    { id: 10, name: "Headset HyperX Cloud", price: 15500, category: "gaming", img: "headset.png" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(filter = 'all') {
    const container = document.getElementById('products-container');
    container.innerHTML = "";
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="/static/${p.img}" onerror="this.src='https://via.placeholder.com/300x220?text=CITY+ROX'">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} دج</p>
                <button onclick="addToCart(${p.id})" class="add-btn">إضافة للسلة</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    // تأثير Toast بسيط
    alert(`تم إضافة ${item.name} ✅`);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    list.innerHTML = "";
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <div>
                    <h5>${item.name}</h5>
                    <small>${item.price.toLocaleString()} دج</small>
                </div>
                <button onclick="remove(${idx})" style="color:red; background:none; border:none; cursor:pointer;">حذف</button>
            </div>
        `;
    });
    document.getElementById('total-price').innerText = total.toLocaleString();
}

function remove(idx) { cart.splice(idx, 1); updateCartUI(); }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('open'); }
function filterProducts(c) {
    displayProducts(c);
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}
function goToCheckout() { window.location.href = '/checkout'; }

displayProducts();
updateCartUI();