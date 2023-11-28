import express from "express";
import Task from "../models/tasksModel.js";


const taskRouter = express.Router();



taskRouter.post('/',async(req,res) =>{
    try {
        if(! req.body.title || ! req.body.description) {
            return res.status(422).send({
                message:"All the fields are required !"
            })
          
        }
        const NewTask = {
            title: req.body.title,
            description: req.body.description
        };
        const task = await Task.create(NewTask);
        return res.status(200).send(task)
    }catch(error) {
        return res.status(500).send({
            message:error.message
        })
    }
});

taskRouter.get('/', async(req,res)=>{
    try{
        const tasks= await Task.find({})
    return res.status(200).send(tasks)
    }catch(error) {
        return res.status(500).send({
            message:error.message
        })
    }
})



taskRouter.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params ;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message:"The provided id is not valide"
            })
          
        }
        const task = await Task.findById(id);
        return res.status(200).send(task)
    } catch (error) {
        return res.status(500).send({
            message:error.message
        })
        
    }
})

taskRouter.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params ;
           if(! req.body.title || ! req.body.description) {
            return res.status(422).send({
                message:"All the fields are required !"
            })
          
            }   
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message:"The provided id is not valide"
            })
        }            
           
            const result = await Task.findByIdAndUpdate(id,req.body);
            if(!result) {
                return res.status(500).send({
                    message:'task not found ! '
                })
                
            }
            return res.status(200).send({message:'task updated successfully ! '})
        
    } catch (error) {
        return res.status(500).send({
            message:error.message
        })
        
    }
})

taskRouter.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params ;  
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message:"The provided id is not valide"
            })
        }            
           
            const result = await Task.findByIdAndDelete(id);
            if(!result) {
                return res.status(500).send({
                    message:'task not found ! '
                })
                
            }
            return res.status(200).send({message:'task deleted successfully ! '})
        
    } catch (error) {
        return res.status(500).send({
            message:error.message
        })
        
    }
})
export default taskRouter;