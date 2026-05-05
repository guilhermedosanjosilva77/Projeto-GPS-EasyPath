import { prisma } from "../conectaDB.js";
import express from "express";
import dependente from "./dependente.js";

const alertas = express()
alertas.use(express.json)


alertas.post("", async function (req, res) {
    const { titulo, descricao, dataCriacao, latitudeAtual, longitudeAtual, dependenteId } = req.params

    if (!titulo || !descricao || !dataCriacao || !latitudeAtual || !longitudeAtual || !dependenteId) {
        return res.status(400).json({ mensagem: "É necessário preencher todos os campos" })
    }
    try {
        const criarAlerta = prisma.alerta.create({
            data: {
                titulo,
                descricao,
                descricao,
                dataCriacao,
                latitudeAtual,
                longitudeAtual,
                dependenteId


            }

        })
        res.json(criarAlerta)
    }
    catch (erro) {
        console.log(erro)
        res.status(500).json({ mensagem: "Ops!, parece que tivemos um erro insesperado" })
    }

    //Busca Geral
    alertas.get("", async function (req, res) {
        const busca = prisma.alerta.findMany

        res.json(busca)

    })


})

//Criacao de requisicao de alerta
alertas.post("", async function (req, res) {

    function calcularDistancia(lat1, lat2, lon1, lon2) {

        const R = 6371e3; // Raio da Terra em metros
        const phi1 = lat1 * Math.PI / 180; // Conversão para radianos
        const phi2 = lat2 * Math.PI / 180;

        const deltaPhi = (lat2 - lat1) * Math.PI / 180;
        const deltaLambda = (lon2 - lon1) * Math.PI / 180

        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Retorna a distância em metros
    }

    const { latitudeAtual, longitudeAtual, dependenteId } = req.body;


    NovoDependente = await prisma.dependente.findUnique({
        where: {id: dependenteId}
    })

    const distância = calcularDistancia(
        latitudeAtual,
        longitudeAtual,
        dependente.latitudeCentro,
        dependente.longitudeCentro
    )

    const RAIO_MAXIMO = dependente.raioSeguranca

    if (distância > RAIO_MAXIMO) {

        const criarAlerta = await prisma.alerta.create({
            data: {
                titulo: "Alerta, dependente está fora da area segura",
                descricao: `O dependente está a ${Math.round(distancia)} metros do centro seguro.`,
                latitudeAtual,
                longitudeAtual,
                dependenteId: dependente.id,
                dataCriacao: new Date()
            }
        })
        console.log("Alerta gerado! Dependente fora do raio.");
        res.json(criarAlerta)

    }

})



export default alertas;