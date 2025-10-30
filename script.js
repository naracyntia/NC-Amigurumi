// Carrinho de compras
let cart = [];

// Função para adicionar itens ao carrinho
function addItemToCart(name, price) {
  cart.push({ name, price });
  updateCartDisplay();
}

// Atualiza o número de itens no botão "Finalizar Pedido"
function updateCartDisplay() {
  const totalItems = cart.length;
  document.getElementById('total-items').textContent = totalItems;
}

// Função para abrir o formulário (Google Forms)
function openFormModal() {
  const modal = document.getElementById('formModal');
  modal.style.display = 'block';
}

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









