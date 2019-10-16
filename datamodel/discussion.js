import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Discussion = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: Array,
    user: {type: Schema.Types.ObjectId, ref: 'User'}, // profile id of the user
    createdOn: {type: Date, required: true},
    modifiedOn: Date,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    toObject: {
        virtuals: true,
        versionKey: false
    }
});

Discussion.methods.toJSON = function() {
    const d = this.toObject();
    d.createdBy = {id: d.user ? d.user.id : '', name: d.user ? d.user.name : ''};
    delete d._id;
    delete d.user;
    return d;
}

export default mongoose.model('Discussion', Discussion);