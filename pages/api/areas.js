//GETS Areas and Lines
import nc from "next-connect";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/config/ncoptions";
const { ObjectId } = require("mongodb");

const handler = nc(ncoptions); //middleware next conect handler

//MIDDLEWARE
handler.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db();
    next();
  } catch (error) {
    console.log("Error connecting to DB in /api/users:", error);
    res.status(500).end("Error connecting to DB");
  }
});

//GET AREAS AND LINES FORM DB
handler.get(async (req, res) => {
  const db = req.db;
  //get all areas with lines using aggregation
  try {
    const areas = await db
      .collection("areas")
      .aggregate([
        {
          $lookup: {
            from: "lines",
            localField: "_id",
            foreignField: "areaId",
            as: "lines",
          },
        },
      ])
      .toArray();

    res.status(200).json(areas);
  } catch (error) {
    console.log("Error getting areas and lines:", error);
    res.status(500).end("Error getting areas and lines");
  }
});

export default handler;
