const express = require('express');
const bodyParser = require('body-parser');
const Gerencianet = require('@gerencianet/gerencianet-js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configurações da API da Gerencianet
const options = {
    client_id: process.env.CLIENT_ID, // Coloque sua client_id
    client_secret: process.env.CLIENT_SECRET, // Coloque sua client_secret
    sandbox: true, // Defina como `false` em produção
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
            cpf: "00000000000", // Substitua pelo CPF do cliente, se disponível
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
