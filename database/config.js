const mongoose = require('mongoose');


const dbConnection = async() => {
   try {
       
       await mongoose.connect('mongodb+srv://eugenio:gyk0nD9YJksIvfn3@cluster0.vzzz5.mongodb.net/hospital', {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true
            });
            console.log('DB Online');
   } catch (error) {
       console.log(error);
       throw new Error('Error a la hora de conectra en la base de datos ');
   }



}

module.exports = {
    dbConnection
}