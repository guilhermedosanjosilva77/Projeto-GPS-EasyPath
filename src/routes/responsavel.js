import { prisma } from "../conectaDB.js";
import express from "express"

const responsavel = express()
responsavel.use(express.json())

responsavel.post("", async function (req,res) {

    const {nome,email,telefone,senha,} = req.body

    if(!nome || !email || !telefone || !senha){
        return res.status(400).json({ mensagem: "É necessário preencher todos os campos" })
    }
    

    try{
        const cadastro = await prisma.responsavel.create({
            data :{
                nome,
                email,
                telefone,
                senha},
            //esse select é o que filtra o que irei retornar    
            select:{
                id:true,
                nome:true,
                email:true,
                telefone:true
            }
        })
        res.status(201).json(cadastro);

    }
    catch(err){
        console.error(err) // Importante para você ver o erro real no terminal
        res.status(500).json({ mensagem: "Ops! Algo deu errado. Tente novamente mais tarde." })
    }
    
})

//buscar todos
responsavel.get("", async function(req,res){
    //conecta com o banco de dados
    const busca = await prisma.responsavel.findMany()
    //salva em json o resultado
     res.json(busca)
     //traz no console o resultado
     console.log(busca)
     console.log("buscando dados....")

})

//atualizar
responsavel.put("/:id", async function(req,res) {
    //busca o id de quem a gnt quer atualizar
    const {id} = req.params
    //manda o json novamente
    const {nome,email,telefone,senha,} = req.body

    //se o id nao existir apita um erro
    if(!id){
        res.status(500).json({mensagem:"Ops! Id não identificado"})
    }

    try{
        //variavel para conexao com o banco utilizando metodo de atualizar
        const atualizar = await prisma.responsavel.update({
            where:{id:Number(id)},
            data:{
                nome,
                email,
                telefone,
                senha

            }
            
        })
        res.json(atualizar)
    }
    catch(err){
        console.error(err) // Importante para você ver o erro real no terminal
        res.status(500).json({ mensagem: "Ops! Algo deu errado. Tente novamente mais tarde." })

    }
    
})

responsavel.delete("", async function (req,res) {
    const {id} = req.params

      if(!id){
        res.status(500).json({mensagem:"Ops! Id não identificado"})
    }

    const deletar = await prisma.responsavel.delete({
        where:{id:Number(id)}
    })
    res.json({mensagem:"usuario deletado"})
    
})

export default responsavel

