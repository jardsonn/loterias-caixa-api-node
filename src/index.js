const express = require('express')
const routes = require('./routes/routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use('/api/v0/', routes)

app.listen(PORT, () => {
    console.log(`Conectado com sucesso!\nhttp://localhost:${PORT}`)
})
