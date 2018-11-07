const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/posts')

router.post('/', ctrl.createPost)
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.patch('/:id', ctrl.editPost)
router.delete('/:id', ctrl.deletePost)

module.exports = router