const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
var swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/userAuth"));

app.use("/products", require("./routes/product"));

app.use("/cart", require("./routes/cart"));

app.use("/orders", require("./routes/order"));

app.use("/users", require("./routes/user"));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});