import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";
const { ObjectId } = require("mongodb");

const handler = nc(ncoptions); //middleware next conect handler

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //gets session and connects to DB Client if authenticated
  const session = await getSession({ req });
  if (session) {
    req.sessionUser = session.user;
    const client = await clientPromise;
    req.db = client.db();
    next();
  } else {
    res.status(401).end("You are not authorized");
    return;
  }
}

//GET USER
handler.get(async (req, res) => {
    const { id } = req.query;
    const db = req.db;
    if (id == req.sessionUser.id) {
        const { name, email, image, updatedAt } = await db
        .collection("datos")
        .findOne({ _id: ObjectId(id) });
        res.json({ name, email, image, updatedAt });
    } else {
        console.log("Can´t read profile, id from query does not match session id");
        res.status(401).end("You are trying to read a different user profile");
    }
    });
