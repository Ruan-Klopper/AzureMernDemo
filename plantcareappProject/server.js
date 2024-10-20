const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin:
      "https://groupterm2v3-bggabkaudreqhae7.southafricanorth-01.azurewebsites.net", // Your frontend URL
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const userRoutes = require("./Routes/UserRoutes");
app.use("/api/users", userRoutes);
const productRoutes = require("./Routes/ProductRoutes");
app.use("/api/products", productRoutes);
const cartRoutes = require("./Routes/cartRoutes");
app.use("/api/carts", cartRoutes);
const plantsRoutes = require("./Routes/PlantsRoutes");
app.use("/api/plants", plantsRoutes);
const appointmentRoutes = require("./Routes/AppointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

app.use(express.static("./plantcareapp/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "plantcareapp", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
