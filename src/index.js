const express = require('express');
const app = express();

require('dotenv').config();

const postulanteRoutes = require('./routes/postulante.router');
const contratadoRoutes = require('./routes/postulanteContrado.router');


app.use(express.json());
app.use('/postulantes', postulanteRoutes);
app.use('/contratados', contratadoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});