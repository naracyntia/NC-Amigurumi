// Exemplo simples para adicionar um item ao carrinho
const cart = [];

function addItemToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    // Lógica para atualizar a interface com o conteúdo do carrinho
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = ''; // Limpa o carrinho antes de atualizar

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item.name + ' - R$ ' + item.price;
        cartElement.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').textContent = 'Total: R$ ' + total.toFixed(2);
}

