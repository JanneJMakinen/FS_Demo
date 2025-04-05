// 3.b stuff
// added cors, PORT = process.env.PORT || 3001, 
// added fe server proxy
// -> removed cors


const express = require('express')
// const cors = require('cors')
const app = express()
app.use(express.static('dist'))

// fe ja be toimivat eri porteissa -> blocked by cors
// tämä voidaan ratkaista käyttämällä cors middlewarea
//app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next()
}
app.use(requestLogger)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/info', (request, response) => {
  response.send(`
    <h1>Hello World!</h1>
    <h2>Usage: </h2>
    <h2>http://localhost:3001/</h2>
    <h2>http://localhost:3001/api/notes/</h2>
    <h2>http://localhost:3001/api/notes/:id</h2>
    <h2>POST /api/notes/:id</h2>
    <h2>DELETE /api/notes/:id</h2>`
  )
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//// ---------------------------------------

// // 3.a stuff
// // express and GET, POST and DELETE
// // REST Client get_all_notes, post_test
// // Middleware express.json, requestLogger
// const express = require('express')
// const app = express()
// app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next()
// }
// app.use(requestLogger)

// // const unknownEndpoint = (request, response) => {
// //   response.status(404).send({ error: 'unknown endpoint' })
// // }
// // app.use(unknownEndpoint)

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   response.json(notes)
// })

// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id === id)
//     if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({
//       error: 'content missing'
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// })

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

//// ---------------------------------------
// // old POST

// app.post('/api/notes', (request, response) => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => Number(n.id))) 
//       : 0
  
//     const note = request.body
//     note.id = String(maxId + 1)
  
//     notes = notes.concat(note)
  
//     response.json(note)
// })

//// ---------------------------------------
// //added notes

// const http = require('http')

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)


// // part3 perus serveri CommonJS

// const http = require('http')

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
