const shortId = require('shortid')
const fs = require('fs')


function createPost(content){
    const newPost = {content, id: shortId()}
    let data = fs.readFileSync('data/posts.json', 'utf-8')
    data = JSON.parse(data)
    data.push(newPost)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/posts.json', data)
    return newPost
}

function getAll() {
    let data = fs.readFileSync('data/posts.json', 'utf-8')
    data = JSON.parse(data)
    return data
}

function getOne(id){
    let data = getAll()
    const index = data.findIndex(post => post.id === id)
    if (index === -1) return false
    return { post: data[index], index }
}

function editPost(id, edits){
    const post = getOne(id)
    if (!post) return false

    let data = fs.readFileSync('data/posts.json', 'utf-8')
    data = JSON.parse(data)

    data[post.index].content = edits
    editedPost = data[post.index]

    data = JSON.stringify(data, null ,4)
    fs.writeFileSync('data/posts.json', data)

    return editedPost
}

function deletePost(id){
    const post = getOne(id)
    if(!post) return false

    let data = fs.readFileSync('data/posts.json', 'utf-8')
    data = JSON.parse(data)

    const deletedPost = data.splice(post.index, 1)
    
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/posts.json', data)
    return deletedPost[0]
}
module.exports = {getAll, getOne, createPost, editPost, deletePost}