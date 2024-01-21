/* eslint-disable @typescript-eslint/quotes */
const express = require('express')
const app = express()
const { auth } = require('express-oauth2-jwt-bearer')
const { pool } = require('./database/pool.ts')
const { authConfig } = require('./config/auth.ts')

const port = process.env.PORT || 5000

const jwtCheck = auth(authConfig)

// enforce on all endpoints
// app.use(jwtCheck)

app.get('/data', (req, res) => {
  res.send('Secured Resource result asdajgsdkaj')
})

const getProductsWithPagination = `SELECT id, name, ROUND(ROW_NUMBER() OVER (ORDER BY name ASC) / 1, 0, 1) AS PageIndex FROM public.products ORDER BY PageIndex, name WHERE PageIndex = 1;`

app.get('/products', jwtCheck, async (req, res) => {
  try {
    const client = await pool.connect()

    // SELECT * FROM public.products

    const result = await client.query('SELECT * FROM public.products')
    res.json(result.rows)
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port)

console.log('Running on port ', port)

process.on('exit', () => {
  // Close the connection pool gracefully
  pool.end()
})

// Handle other signals like SIGINT and SIGTERM for graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  pool.end(() => {
    process.exit(0)
  })
})
