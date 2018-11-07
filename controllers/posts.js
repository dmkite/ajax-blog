const model = require('../models/posts')

function createPost(req,res, next){
    const content = req.body.content
    if(!content) return next({status:400, error: 'You need to include a body'})
    const createdPost = model.createPost(content)
    res.status(201).send({data:createdPost})
}

function getAll(req, res) {
    const posts = model.getAll()
    res.status(200).send({data:posts})
}

function getOne(req,res, next){
    const id = req.params.id
    const correctPost = model.getOne(id)
    if (!correctPost) return next({ status: 404, error: `No post found under ID '${id}'` })
    res.status(200).send({data:correctPost.post})
}

function editPost(req, res, next){
    const id = req.params.id
    const edits = req.body.content
    if (!edits) return next({ status: 400, error: 'You must include content' })
    const editedPost = model.editPost(id, edits)
    if (!editedPost) return next({ status: 404, error: `No post found under ID '${id}'` })
    res.status(200).send({data: editedPost})
}

function deletePost(req, res, next){
    const id = req.params.id
    const deletedPost = model.deletePost(id)
    if (!deletedPost) return next({ status: 404, error: `No post found under ID '${id}'` })
    res.status(200).send({data:deletedPost})
}

module.exports = { createPost, getAll, getOne, editPost, deletePost}