const db = require("mongoose")("127.0.0.1:27017");

const express = require("express")

const app = express()
const port = 5000

app.use(cors())
app.use(json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`e-Notebook backend listening on port http://localhost:${port}`)
})