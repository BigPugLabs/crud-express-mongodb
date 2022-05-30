const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 8000

console.log('Avengers of the Nerds')

app.listen(PORT, () => console.log(`listening on ${PORT}`))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})