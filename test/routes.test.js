const chai = require('chai')
const expect = chai.expect
const app = require('../app')

chai.use(require('chai-http'))

describe('POST /', function(){
    it('should create a blogpost',function(done){
        const post = { id: "7oet_d9Z", content: "lorem ipsum dolor sid amet", title: "10 Things You Have In Common With Bigfoot"}
        chai.request(app)
            .post('/posts')
            .send(post)
            .end((err, res) => {
                expect(res.status).to.equal(201)
                expect(res.body.data).to.be.an('object')
                expect(!!res.body.data.id).to.be.true
                expect(!!res.body.data.content).to.be.true
                expect(!!res.body.data.title).to.be.true
                expect(!!res.body.data.id).to.be.ok
                expect(typeof(res.body.data.id)).to.be.a('string')
                expect(res.body.data.content).to.equal(post.content)
                done()
            })
    })

    it('should return an error if there\'s no content', function(done){
        const post = { id: "7oet_d9Z"}
        chai.request(app)
            .post('/posts')
            .send(post)
            .end( (err,res) =>{
                expect(res.status).to.equal(400)
                expect(!!res.body.error).to.be.true
                done()
            } )
    })

})

describe('GET /', function(){
    it('should return all available posts', function(done){
    chai.request(app)
        .get('/posts')
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(Array.isArray(res.body.data)).to.be.true
            done()
        })
    })
})

describe('GET /:id', function(){
    it('should return the specified post', function(done){
    chai.request(app)
        .get('/posts')
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.an('array')
            
    
        post = res.body.data[0]
        chai.request(app)
            .get(`/posts/${post.id}`)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data).to.be.an('object')
                expect(res.body.data.id).to.be.a('string')
                expect(res.body.data.id.length).to.be.greaterThan(0)
                done()
           })
        })
        it('should return an error if the id is invalid', function (done) {
            chai.request(app)
                .get('posts/z')
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(!!res.body.error).to.be.true
                    done()
                })
        })
    })
})

describe('PATCH /:id', function(){
    it('should edit the specified post with new information', function(done){
    chai.request(app)
        .get('/posts')
        .end((err, res) =>{
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.an('array')
        
        const post = res.body.data[0]    
        const newInfo = {content: 'new information to patch through'}
        chai.request(app)
            .patch(`/posts/${post.id}`)
            .send(newInfo)
            .end((err,res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data).to.be.an('object')
                expect(res.body.data.id).to.equal(post.id)
                expect(res.body.data.content).to.equal(newInfo.content)
                done()
            })
        })
        it('should return an error if the ID is invalid', function (done) {
            chai.request(app)
                .get('posts/z')
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.error).to.be.an('object')
                    done()
                })
        })
    })
    
})

describe('DELETE /:id', function(){
    it('should delete a specified post and return it', function(done){
    chai.request(app)
        .get('/posts')
        .end((err, res) =>{
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.an('array')

            const post = res.body.data[0]
            chai.request(app)
                .delete(`/posts/${post.id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.data).to.be.an('object')
                    done()
                })
        })
        it('should return an error if the ID is invalid', function (done) {
            chai.request(app)
                .get('posts/z')
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.error).to.be.an('object')
                    done()
                })
        })
    })
})