import { addRouteToApiRouter, addRouteToSessionRouter } from "../router";
import Discussion from '../datamodel/discussion';
import Comment from '../datamodel/comment'; // this is done to initiate the comment schema
import validator from "../utils/validator";
import User from '../datamodel/user';
import error from "../messages/error";
import status from "../messages/status";

addRouteToApiRouter('/add-discussion', 'post', userLoggedCheck, validationHandler.bind(this, 'discussion'), async (req, res) => {
    try {
        const { body, user } = req;
        
        const newDiscussion = Object.assign({}, body);
        const date = new Date();
        newDiscussion.createdOn = date;
        newDiscussion.modifiedOn = date;
        newDiscussion.user = user;
        const discussion = await Discussion.create(newDiscussion);
        console.log('discussion added', discussion);
        res.status(status.success).json(discussion);
    } catch(err) {
        console.log('error', err);
        res.status(status.forbidden).end();
    }
});

addRouteToSessionRouter('/get-discussions', 'get', async (req, res) => {
    try {
        const discussions = await Discussion.find().populate({path: 'comments', populate: 'user'}).populate('user');
        if (!!discussions) {
            res.status(status.success).json(discussions);
        } else {
            res.status(status.forbidden).end();
        }
    } catch(err) {
        console.log('error', err);
        res.status(status.forbidden).end();
    }
});

addRouteToSessionRouter('/get-discussion/:id', 'get', async (req, res) => {
    try {
        const { params } = req;
        if (!params || !params.id) {
            res.status(status.badRequest).json(error.missingParam);
            return;
        } 
        const { id } = params;
        const discussion = await Discussion.findById(id).populate({path: 'comments', populate: 'user'}).populate('user');

        if (!!discussion) {
            res.status(status.success).json(discussion);
        } else {
            res.status(status.forbidden).end();
        }
    } catch(err) {
        console.log('error', err);
        res.status(status.forbidden).end();
    }
});

addRouteToApiRouter('/delete-comment/:id', 'delete', userLoggedCheck, async (req, res) => {    
    const { params } = req;
    if (!params || !params.id) {
        res.status(status.badRequest).json(error.missingParam);
        return;
    } else {
        try {
            const { id } = params;
            const comment = await Comment.findById(id).populate('user');
            if (validateUserOfComment(comment, req.user)) {
                Comment.deleteOne({ _id: id }, function(err) {
                    if (!err) {
                        res.status(status.success).end();
                    } else {
                        res.status(status.forbidden).end();
                    }
                });
            } else {
                res.status(status.unauthorised).json(error.unauthorisedError);
            }
        } catch(err) {
            console.log('error', err);
            res.status(status.forbidden).end();
        }
    }
    
});

addRouteToApiRouter('/add-comment/:discussionId', 'post', userLoggedCheck, validationHandler.bind(this, 'comment'), async (req, res) => {
    const { params } = req;
    if (!params || !params.discussionId) {
        res.status(status.badRequest).json(error.missingParam);
        return;
    } else {
        try {
            const { discussionId } = params;
            const { body, user } = req;
        
            const discussion = await Discussion.findById(discussionId).populate('user');
            if (validateUserOfDiscussion(discussion, req.user)) {
                const date = new Date();
                const newComment = {
                    description: body.comment,
                    user, 
                    discussionId: discussion._id,
                    createdOn: date,
                    modifiedOn: date,
                    ranking: 0
                };

                const comment = await Comment.create(newComment);
                discussion.comments.push(comment);
                await discussion.save();
                res.status(status.success).json(comment);
            } else {
                res.status(status.unauthorised).json(error.unauthorisedError);
            }
            
        } catch(err) {
            console.log('error', err);
            res.status(status.forbidden).end();
        }
    }
});

addRouteToApiRouter('/update-comment/:id', 'patch', userLoggedCheck, validationHandler.bind(this, 'comment'), async (req, res) => {
    
    const { params } = req;
    if (!params || !params.id) {
        res.status(status.badRequest).json(error.missingParam);
        return;
    } else {
        try {
            const { id } = params;
            const { body } = req;
        
            const comment = await Comment.findById(id).populate('user');
            if (validateUserOfComment(comment, req.user)) {
                const date = new Date();
                comment.description = body.comment;
                comment.modifiedOn = date;             
                await comment.save();
                res.status(status.success).end();
            } else {
                res.status(status.unauthorised).json(error.unauthorisedError);
            }
            
        } catch(err) {
            console.log('error', err);
            res.status(status.forbidden).end();
        }
    }
});

addRouteToApiRouter('/update-discussion/:id', 'patch', userLoggedCheck, validationHandler.bind(this, 'discussion'), async (req, res) => {
    const { params } = req;
    if (!params || !params.id) {
        res.status(status.badRequest).json(error.missingParam);
        return;
    } else {
        try {
            const { body } = req;
            const { id } = params;
            const discussion = await Discussion.findById(id).populate('user');
            if (validateUserOfDiscussion(discussion, req.user)) {
                const date = new Date();
                Object.assign(discussion, body, { modifiedOn: date }); // merge new info
                
                await discussion.save();

                res.status(status.success).end();
            } else {
                res.status(status.unauthorised).json(error.unauthorisedError);
            }
        } catch(err) {
            console.log('error', err);
            res.status(status.forbidden).end();
        }
    }
});


function validationHandler(constraintType, req, res, next) {
    const {body} = req;
    
    const validationResult = validator.validateBody(body, constraintType);
    if (!validationResult) {
        next();
    } else {
        res.status(status.badRequest).json(error.createErrorMessage(validationResult));
        return;
    }
}

function validateUserOfDiscussion(discussion, user) {
    if (discussion && user) {
        return discussion.user.id === user.id;
    }
    return false;
}

function validateUserOfComment(comment, user) {
    if (comment && user) {
        return comment.user.id === user.id;
    }
    return false;
}

function userLoggedCheck(req, res, next) {
    if (req.user && req.user.loggedIn) {
        next();
    } else {
        res.status(status.unauthorised).json(error.unauthorisedError)
    }
}
