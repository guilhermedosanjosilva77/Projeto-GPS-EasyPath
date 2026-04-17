    import { prisma } from "../conectaDB.js";
    import express from "express";

    const dependente = express()
    dependente.use(express.json)

    //buscar
    dependente.get("", async function (req,res) {

        const buscar = await prisma.dependente.findMany()

        console.log("buscando dependentes.....")
        res.json(buscar)
        
    })

    //criar
    dependente.post("", async function (req,res) {

        const {nome,parentesco,dataNascimento,latitudeCentro,longitudeCentro,raioSeguranca,responsavelID} = req.body

        if(!nome|!parentesco|!dataNascimento|!raioSeguranca|!responsavelID){
            req.status(500).json({mensagem:"Voce deve preencher todos os itens"})
        }
        
    })



    export default dependente;