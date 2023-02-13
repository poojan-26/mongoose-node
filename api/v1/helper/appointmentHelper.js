const appointment = require('../models/appointment');

class hospitalHelper {

                        async findall(req,res){
                            try{
                                const appoint = await appointment.find()
                                return appoint;
                            }catch (err){
                                 console.log(`there was an error ${err}`) 
                            }
                        }

                        async create(body){
                            try{
                                const appoint = {
                                            doctorSpecialization: body.doctorSpecialization,
                                            doctorId: body.doctorId,
                                            userId: body.userId,
                                            consultancyFees: body.consultancyFees,
                                            appointmentDate: body.appointmentDate,
                                            appointmentTime: body.appointmentTime,
                                            creationdate: body.creationdate
                                            }
                                            const response =await new appointment(appoint).save();
                                            return response;   
                            }catch (err){
                                    console.log(`there was an error ${err}`) 
                            }
                        }

                        async findOne(id){
                            try{
                                const appoint = await appointment.findById({_id:id});
                                console.log(appoint);
                                return appoint;
                            }catch (err){
                                    console.log(`there was an error ${err}`) 
                            }
                        }
                        
                        async updateappointment(body, id){
                            try{
                                const appoint = {
                                            doctorSpecialization: body.doctorSpecialization,
                                            doctorId: body.doctorId,
                                            userId: body.userId,
                                            consultancyFees: body.consultancyFees,
                                            appointmentDate: body.appointmentDate,
                                            appointmentTime: body.appointmentTime,
                                            creationdate: body.creationdate
                                            }
                                            const response = await appointment.findOneAndUpdate(id, {$set:appoint}, {new: true});
                                            // console.log(id);
                                            return response;
                            }catch (err){
                                    console.log(`there was an error ${err}`) 
                                    }
                        }

                        async delete(id){
                            try{
                                const user = await appointment.deleteOne({_id:id});
                                console.log(user);
                                return user;
                            }catch (err){
                                    console.log(`there was an error ${err}`) 
                                    }
                        }

    


}
module.exports = new hospitalHelper()