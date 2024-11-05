const express = require('express');
const bodyParser = require('body-parser');
const Gerencianet = require('https://app.sejaefi.com.br/api/aplicacoes/288104/producao');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configurações da API da Gerencianet
const options = {
    client_id: process.env.CLIENT_ID, // Coloque sua client_id
    client_secret: process.env.CLIENT_SECRET, // Coloque sua client_secret
    pix_cert: examples/credentials
    sandbox: true, // Defina como `false` em produção
    debug: false, 
};

// Rota para criar um QR Code Pix
app.post('/api/pedidos', async (req, res) => {
    const { nome, email, produto } = req.body;

    // Configura o valor do pedido e os dados do Pix
    const params = {
        txid: `pedido_${Date.now()}`, // Identificação única
    };

    const body = {
        calendario: {
            expiracao: 86400, // QR Code expira em 1 hora
        },
        devedor: {
            nome: nome,
            cpf: " ", // Substitua pelo CPF do cliente, se disponível
        },
        valor: {
            original: " ", // Valor do produto em reais (exemplo)
        },
        chave: "916.823.471-68", // Chave Pix cadastrada
        infoAdicionais: [
            {
                nome: "Produto",
                valor: produto,
            },
            {
                nome: "Email",
                valor: email,
            },
        ],
    };

    try {
        const gerencianet = new Gerencianet(options);
        const response = await gerencianet.pixCreateImmediateCharge(params, body);

        // Recupera o QR Code gerado
        const qrcodeResponse = await gerencianet.pixGenerateQRCode({ id: response.loc.id });

        res.json({
            qrCodeImage: qrcodeResponse.qrcode_image,
            qrCodeText: qrcodeResponse.qrcode,
        });
    } catch (error) {
        console.error('Erro ao criar cobrança Pix:', error);
        res.status(500).json({ error: 'Erro ao gerar o QR Code Pix' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// server.js
const express = require('express');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

// Endpoint para receber pedidos
app.post('/api/pedido', async (req, res) => {
    try {
        const pedido = req.body;

        // Gerar QR Code Pix (Função fictícia abaixo)
        const qrCodeUrl = await gerarPix(pedido);

        res.json({ success: true, qrCodeUrl });
    } catch (error) {
        console.error('Erro ao processar o pedido:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar o pedido' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
