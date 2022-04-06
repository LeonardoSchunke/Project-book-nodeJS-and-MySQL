const { query } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const res = require('express/lib/response')
const pool = require('./db/conn')
const { isRequired } = require('nodemon/lib/utils')
const port = process.env.PORT || 3000

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const page = req.body.page

    const sql = `INSERT INTO books (title, page) VALUES ('${title}', '${page}')`

    pool.query(sql, function(error) {
        if (error) {
            console.log(error)
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    pool.query(sql, function (error, data) {
        if (error) {
            console.log(error)
            return
        }

        const books = data

        // console.log(books)

        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql, function (error, data) {
        if (error) {
            console.log(error)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql, function (error, data) {
        if (error) {
            console.log(error)
            return
        }

        const book = data[0]

        res.render('editBook', { book })
    })
})

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const page = req.body.page

    const sql = `UPDATE books SET title = '${title}', page = '${page}' WHERE id = ${id}`

    pool.query(sql, function(error) {
        if (error) {
            console.log(error)
            return
        }

        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ${id}`

    pool.query(sql, function(error) {
        if (error) {
            console.log(error)
            return
        }

        res.redirect('/books')
    })
})

app.listen(port)