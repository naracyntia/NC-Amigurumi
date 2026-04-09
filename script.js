let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =============================
// SALVAR
// =============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =============================
// ADICIONAR ITEM
// =============================
function addItemToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartDisplay();
}

// =============================
// ATUALIZAR UI
// =============================
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const itemsEl = document.getElementById('total-items');
  if (itemsEl) itemsEl.textContent = totalItems;
}

// =============================
// GERAR TEXTO DO PEDIDO
// =============================
function generateOrderText() {
  return cart.map(item =>
    `${item.name} (x${item.quantity})`
  ).join(", ");
}

// =============================
// ENVIAR PEDIDO
// =============================
function enviarPedido() {

  const nome = document.getElementById("nome")?.value;

  if (!nome || cart.length === 0) {
    alert("Preencha seu nome e adicione produtos!");
    return;
  }

  const produtos = generateOrderText();

  const data = new URLSearchParams();
  data.append("entry.2005620554", nome);
  data.append("entry.1045781291", produtos);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSeoeR_2F0asI37oL-l8Zyh20bdzIviqbiF21fGhTn8Dkzdx7w/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  alert("Pedido enviado com sucesso!");

  cart = [];
  saveCart();
  updateCartDisplay();
}

// =============================
// EVENTOS
// =============================
document.addEventListener("DOMContentLoaded", () => {

  updateCartDisplay();

  document.querySelectorAll('.adicionar-carrinho').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price || 0);

      if (!name) {
        alert("Produto sem nome configurado!");
        return;
      }

      addItemToCart(name, price);
    });
  });

});







