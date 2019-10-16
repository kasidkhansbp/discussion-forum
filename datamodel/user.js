import mongoose from 'mongoose';
import validator from "../utils/validator";

const Schema = mongoose.Schema;
const User = new Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    name: {type: String, required: true},
    id: {type: String, required: true},
    accessToken: {type: String, required: true},
    email: {type: String, required: true, validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    provider: {type: String, required: true},
    loggedIn: {type: Boolean, default: false}
});

User.set('toObject', {
    versionKey: false
});

User.methods.toJSON = function() {
    const u = this.toObject();
    delete u._id;
    return u;
}

User.statics.updateOrCreate = function(userToFind) {
   return new Promise((resolve, reject) => {
       
        this.findOne({
            id: userToFind.id
        }, async (err, user) => {
            try {
                if (!user || err) {                    
                    const newUser = await this.create(userToFind);                   
                    resolve(newUser);
                } else {
                    await this.updateOne({id: userToFind.id}, userToFind);
                    
                    resolve(Object.assign(user, userToFind));
                }
            } catch(e) {
                resolve(null);
            }
        });
    });
}
export default mongoose.model('User', User);