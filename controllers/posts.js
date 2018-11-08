const model = require('../models/posts')

function createPost(req,res, next){
    const {content, title} = req.body
    console.log(req.body)
    if(!content || !title) return next({status:400, error: 'You need to include content and a title'})
    const createdPost = model.createPost(content, title)
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
    const {content, title} = req.body
    if (!content && !title) return next({ status: 400, error: 'You must include either content or a title' })
    const edits = {content, title}
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