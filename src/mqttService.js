import mqtt from 'mqtt';
import { prisma } from './testeDB.js'; // Importa seu cliente Prisma já configurado

// Conecta ao Broker (ex: HiveMQ, Mosquitto ou EMQX)
const client = mqtt.connect('mqtt://broker.hivemq.com'); // Usando um broker público para teste

client.on('connect', () => {
    console.log('📡 Conectado ao Broker MQTT');
    
    // Inscreve no tópico onde o hardware envia os dados
    client.subscribe('seguranca/monitoramento/localizacao', (err) => {
        if (!err) {
            console.log('✅ Inscrito no tópico de monitoramento');
        }
    });
});

// Quando chegar uma mensagem do Hardware
client.on('message', async (topic, message) => {
    // message vem como Buffer, precisamos converter para String e depois JSON
    const payload = JSON.parse(message.toString());
    console.log(`Recebido do tópico ${topic}:`, payload);

    // Salvando direto no banco via Prisma
    try {
        const novaLeitura = await prisma.user.create({
            data: {
                nome: payload.dispositivo,
                sobrenome: "LOG_MQTT",
                idade: payload.valor // Exemplo usando seus campos atuais
            }
        });
        console.log('💾 Dado do hardware salvo no banco!');
    } catch (error) {
        console.error('❌ Erro ao salvar dado do MQTT:', error);
    }
});

export default client;