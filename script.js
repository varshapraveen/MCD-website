document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const cart = document.getElementById('cart');
    items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    });
    });
    cart.addEventListener('dragover', (e) => {
    e.preventDefault();
    });
    cart.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(id);
    addItemToCart(draggedItem);
    });
    });
    function addItemToCart(item) {
    const cart = document.getElementById('cart');
    const id = item.id;
    const price = parseInt(item.getAttribute('data-price'));
    const existingItem = cart.querySelector(`#${id}`);
    if (existingItem) {
    // Update quantity if item already in cart
    const quantityElement = existingItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
    } else {
    // Clone and add new item if not in cart
    const clone = item.cloneNode(true);
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = '1';
    clone.appendChild(quantitySpan);
    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
    removeItemFromCart(clone);
    };
    clone.appendChild(removeButton);
    cart.appendChild(clone);
    }
    updateTotalCost(item);
    }
    function updateTotalCost(item) {
    const price = parseInt(item.getAttribute('data-price'));
    const totalCostElement = document.getElementById('totalCost');
    const currentTotal = parseInt(totalCostElement.innerText.replace('Total Cost: 
    ₹ ', ''));
    totalCostElement.innerText = `Total Cost: ₹ ${currentTotal + price}`;
    }
    function removeItemFromCart(item) {
    const cart = document.getElementById('cart');
    const quantityElement = item.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
    // Decrease quantity and update total cost
    quantityElement.textContent = quantity - 1;
    updateTotalCostOnRemove(item);
    } else {
    // Remove item and update total cost
    cart.removeChild(item);
    updateTotalCostOnRemove(item);
    }
    }
    function updateTotalCostOnRemove(item) {
    const price = parseInt(item.getAttribute('data-price'));
    const totalCostElement = document.getElementById('totalCost');
    const currentTotal = parseInt(totalCostElement.innerText.replace('Total Cost: 
    ₹ ', ''));
    totalCostElement.innerText = `Total Cost: ₹ ${currentTotal - price}`;
    }
    function proceedToBilling() {
    const totalCost = document.getElementById('totalCost').innerText;
    document.getElementById('modalContent').innerText = ` ${totalCost}`;
    document.getElementById('billingModal').style.display = 'block';
    }
    function closeModal() {
    document.getElementById('billingModal').style.display = 'none';
    }
    function resetCart() {
    document.getElementById('cart').innerHTML = '';
    document.getElementById('totalCost').innerText = 'Total Cost: ₹ 0.00';
    }
    