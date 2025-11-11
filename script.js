// Carrinho de compras
let cart = [];

// Função para adicionar itens ao carrinho
function addItemToCart(name, price) {
  cart.push({ name, price });
  updateCartDisplay();
}

// Adiciona um item ao carrinho
function addItemToCart(name, price) {
  // Verifica se o item já existe no carrinho
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity += 1; // incrementa a quantidade
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartDisplay();
}

// Remove um item do carrinho
function removeItemFromCart(name) {
  const itemIndex = cart.findIndex(i => i.name === name);

  if (itemIndex > -1) {
    const item = cart[itemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1; // diminui a quantidade
    } else {
      cart.splice(itemIndex, 1); // remove o item totalmente
    }
  }

  updateCartDisplay();
}

//Atualiza o número de itens e o valor total no botão "Finalizar Pedido"
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-valor').textContent = totalValue.toFixed(2).replace('.', ',');
}

document.addEventListener("DOMContentLoaded", () => {
  const finalizarBtn = document.getElementById("btnFinalizar");

  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeoeR_2F0asI37oL-l8Zyh20bdzIviqbiF21fGhTn8Dkzdx7w/viewform?usp=dialog";
      window.open(formUrl, "_blank"); // abre o formulário em nova aba
    });
  }
});


// Fecha o modal
function closeFormModal() {
  const modal = document.getElementById('formModal');
  modal.style.display = 'none';
}

// Espera o DOM carregar antes de buscar os elementos
document.addEventListener('DOMContentLoaded', () => {
  // Botões de adicionar ao carrinho
  const buttons = document.querySelectorAll('.adicionar-carrinho');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      addItemToCart(name, price);
    });
  });

  // Botão de finalizar pedido
  const btnFinalizar = document.getElementById('btnFinalizar');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', openFormModal);
  }

  // Fechar o modal
  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeFormModal);
  }
});









