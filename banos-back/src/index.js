
const app = require('./app');
const port =  8080;

app.get('/', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})