const Doctorspe = require('../models/doctorspecilization');

class hospitalHelper {

    async findall(req,res){
        try{
                const specilization = await Doctorspe.find();
                console.log(specilization);
               return specilization;
        }catch (err){
                console.log(`there was an error ${err}`) 
                }
    }

    async create(body){
        try{
         const specilization = {
            specilization: body.specilization,
             creationdate: body.creationdate
         }
         const response =await new Doctorspe(specilization).save();
         return response;   
 }catch (err){
         console.log(`there was an error ${err}`) 
         }
}

    
async findOne(id){
    try{
               const specilization = await Doctorspe.findById({_id:id});
               console.log(specilization);
            return specilization;
       }catch (err){
            console.log(`there was an error ${err}`) 
            }
   }

   async updatespecilization(body, id){
    try{
        const specilization = {
                           specilization: body.specilization,
                           creationdate: body.creationdate
                        }
                        const response = await Doctorspe.findOneAndUpdate(id, {$set:specilization}, {new: true});
                        // console.log(id);
                        return response;
    }catch (err){
            console.log(`there was an error ${err}`) 
            }
}

async delete(id){
    try{
            // let id = req.params.id
            const response = await Doctorspe.deleteOne({_id:id});
            console.log(response);
            return response;
    }catch (err){
            console.log(`there was an error ${err}`) 
            }
}




}
module.exports = new hospitalHelper()