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
    try{
        dependente.post("", async function (req,res) {

        const {nome,parentesco,dataNascimento,latitudeCentro,longitudeCentro,raioSeguranca,responsavelID} = req.body

        if(!nome|!parentesco|!dataNascimento|!raioSeguranca|!responsavelID){
            req.status(500).json({mensagem:"Voce deve preencher todos os itens"})
        }

        const cadastroDependente = prisma.dependente.create({
            data:{
                    nome,
                    parentesco,
                    dataNascimento,
                    latitudeCentro,
                    longitudeCentro,
                    raioSeguranca,
                    //Aqui é importantissimo que o dado que retorne do front seja o id do responsavel que esta faznedo o cadastro
                    responsavelID:parseInt(responsavelID)
                 },
                 select:{
                    nome:true,
                    parentesco:true,
                    dataNascimento:true

                 }
        })
        res.status(201).json(cadastroDependente)

        
    })

    }
    catch(err){
         res.status(500).json({ mensagem: "Ops! Algo deu errado. Tente novamente mais tarde." })
    }

    //buscar todos, apenas para verificação aqui no back
    dependente.get("", async function(req,res){
        const buscar = prisma.dependente.findMany

        res.json(buscar)
    })

    //atualizar
    dependente.put(":id", async function (req,res) {
        const id = req.params
        const {nome,parentesco,dataNascimento,latitudeCentro,longitudeCentro,raioSeguranca,responsavelID} = req.body

        if(!id){
             res.status(500).json({mensagem:"Ops! Id não identificado"})
        }

        try{
            const atualizar = prisma.dependente.update({
                where:{id:Number(id)},
                data:{
                     nome,
                    parentesco,
                    dataNascimento,
                    latitudeCentro,
                    longitudeCentro,
                    raioSeguranca
                }
            })
            res.json(atualizar)
        }
        catch(erro){
            res.status(500).json({mensagem:"Erro inesperado, tente novamente ais tarde!"})

        }


        
    })

    //deletar
    



    export default dependente;