import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//import the mongodb models
import Place from "./models/place_model.js";

//connect database
mongoose
  .connect(process.env.DB_Connect, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//the routes

//get all the customer and order datas from database when use first arrive the website

// find the singles customer's data and their orders
app.get("/SearchCounty", async (req, res) => {
  try {
    //find the customer data which id matches
    let places = await Place.find(req.query);

    res.status(200).json(places);
  } catch (e) {
    console.error(e);
  }
});

//insert new datas into the database
app.post("/addPlace", async (req, res) => {
  try {
    const { county, region, village, place } = req.body;
    const theplace = new Place({ county, region, village, place });
    let added = await theplace.save();
    console.log("success");
    res.status(200).json(added);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//update the data in database
app.put("/PlaceEdit/:id", async function (req, res) {
  const { error } = EditCustValidate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    let toUpdate = req.body;
    let { id } = req.params;
    if (toUpdate.CustID) {
      let theSame = await Customer.findOne({ CustID: toUpdate.CustID });
      if (theSame) {
        return res.status(400).send("已經有相同的CustID，請使用別的");
      }
    }
    let updateConsequence = await Customer.updateOne({ _id: id }, toUpdate);
    res.status(200).json(updateConsequence);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//delete data in database
app.delete("/PlaceDelete/:id", async function (req, res) {
  try {
    let { id } = req.params;
    let deleteConsequence = await Customer.deleteOne({ _id: id });
    res.send(deleteConsequence);
  } catch (e) {
    console.error(e);
  }
});

app.listen(3503, () => {
  console.log("port 3503 receiving request.");
});
