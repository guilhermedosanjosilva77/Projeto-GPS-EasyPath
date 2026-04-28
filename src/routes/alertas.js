import { prisma } from "../conectaDB.js";
import express from "express";

const alertas = express()
alertas.use(express.json)


alertas.post("", async function (req,res) {
    const {titulo,descricao,dataCriacao,latitudeAtual,longitudeAtual,dependenteId} = req.params

    if(!titulo || !descricao || !dataCriacao || !latitudeAtual || !longitudeAtual || !dependenteId){
        return res.status(400).json({ mensagem: "É necessário preencher todos os campos" })
    }
    try{
        const criarAlerta = prisma.alerta.create({
            data:{
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
    catch(erro){
        console.log(erro)
        res.status(500).json({mensagem:"Ops!, parece que tivemos um erro insesperado"})
    }

    //Busca Geral
    alertas.get("", async function (req,res) {
        const busca = prisma.alerta.findMany

        res.json(busca)
        
    })

    
})

alertas.get(":dataCriacao", async function (req,res) {

    const data = req.params

    try{
        const buscaData = prisma.alerta.findMany({
            where:{dataCriacao:data}
            data:{

            }
            
        })
    }
    
})

export default alertas;