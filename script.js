let buyButton = document.querySelectorAll('.buy-button')
let checkoutButton = document.querySelector('.cart-button')
let cartItems = document.querySelector('.cart-items')
let cartContainer = document.querySelector('.cart-container')

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(game) {
    cart.push(game)
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartCount()
}

function removeFromCart(index) {
    cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart()
    updateCartCount()
}

function updateCartCount() {
    let cartLink = document.querySelector('a[href="cart.html"]')
    if (cartLink) {
        let count = cart.length
        let badge = cartLink.querySelector('.cart-count')
        if (!badge) {
            badge = document.createElement('span')
            badge.className = 'cart-count'
            cartLink.appendChild(badge)
        }
        if (count > 0) {
            badge.textContent = count
            badge.style.display = 'inline-block'
        } else {
            badge.style.display = 'none'
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.buy-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const gameItem = this.closest('.game-item')
            const title = gameItem.querySelector('h2').textContent
            const price = gameItem.querySelector('.price') ? gameItem.querySelector('.price').textContent : ''
            addToCart({ title, price })
            alert(`Added "${title}" to cart!`)
        })
    })

    if (window.location.pathname.includes('cart.html')) {
        renderCart()
    }

    updateCartCount()
})

function renderCart() {
    let cartItems = document.querySelector('.cart-items')
    let cartTotal = document.querySelector('#total-price')
    if (!cartItems) return

    cartItems.innerHTML = ''
    let total = 0

    if (cart.length == 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'
        if (cartTotal) cartTotal.textContent = '0'
        return;
    }

    for (let idx = 0; idx < cart.length; idx++) {
        let item = cart[idx];
        let div = document.createElement('div')
        div.className = 'cart-item-row'
        div.innerHTML = `
            <div class="cart-card">
                <div class="cart-card-info">
                    <span class="cart-game-title">${item.title}</span>
                    <span class="cart-game-price">${item.price}</span>
                </div>
                <button class="remove-cart-item" data-idx="${idx}">Remove</button>
            </div>
        `
        cartItems.appendChild(div);

        if (item.price) {
            let priceNum = parseFloat(item.price.replace('$', ''));
            if (!isNaN(priceNum)) total += priceNum;
        }
    }

    if (cartTotal) cartTotal.textContent = total.toFixed(2)

    let removeBtns = document.querySelectorAll('.remove-cart-item');
    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].onclick = function() {
            removeFromCart(parseInt(this.dataset.idx))
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.cart-button')
    const checkoutWindow = document.getElementById('checkout-window')
    const closeCheckout = document.getElementById('closeCheckout')
    const closeCheckoutX = document.getElementById('checkoutCloseX')
    const confirmCheckout = document.getElementById('confirmCheckout')

    if (checkoutBtn && checkoutWindow) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault()
            checkoutWindow.classList.add('open')
        })
    }

    const closeBtns = [closeCheckout, closeCheckoutX]
    for (let i = 0; i < closeBtns.length; i++) {
        let btn = closeBtns[i]
        if (btn && checkoutWindow) {
            btn.addEventListener('click', function() {
                checkoutWindow.classList.remove('open')
            })
        }
    }

    if (confirmCheckout && checkoutWindow) {
        confirmCheckout.addEventListener('click', function() {
            checkoutWindow.classList.remove('open')
        })
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput')
    const gameItems = document.querySelectorAll('.game-item')

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase()
        for (let i = 0; i < gameItems.length; i++) {
            const item = gameItems[i]
            const title = item.querySelector('h2') ? item.querySelector('h2').textContent.toLowerCase() : ''
            const desc = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : ''
            if (title.includes(query) || desc.includes(query)) {
                item.style.display = ''
            } else {
                item.style.display = 'none'
            }
        }
    })
})

