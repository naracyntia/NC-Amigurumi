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

document.addEventListener("DOMContentLoaded", () => {
  const finalizarBtn = document.getElementById("btnFinalizar");

  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      // Substitua o link abaixo pelo link real do seu formulário Google Forms:
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









