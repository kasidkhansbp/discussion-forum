import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Comment = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    description: {type: String, required: true},
    tags: Array,
    user: {type: Schema.Types.ObjectId, ref: 'User'}, // profile id of the user
    discussionId: {type: Schema.Types.ObjectId, required: true},
    createdOn: {type: Date, required: true},
    modifiedOn: Date,
    ranking: Number
}, {
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function(doc, c) {
            c.createdBy = {id: c.user ? c.user.id : '', name: c.user ? c.user.name : ''};
            delete c._id;
            delete c.user;
            return c;
        }
    }
});

export default mongoose.model('Comment', Comment);