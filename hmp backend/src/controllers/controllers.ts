import { Request } from "express";
import {
  getProductByIdQuery,
  getProductsQuery,
} from "../database/queries/productQueries.js";
import { postOrderQuery } from "../database/queries/orderQueries.js";
import bodyParser from "body-parser";
import { OrderParams } from "../models/index.js";

export const jsonParser = bodyParser.json();

export const getProducts = async (req: Request, res) => {
  const { take, skip } = req.query;

  try {
    const result = await getProductsQuery(take as string, skip as string);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res) => {
  const { id } = req.params;

  try {
    const result = await getProductByIdQuery(id);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const postOrder = async (req: Request, res) => {
  const data: OrderParams[] = req.body;

  try {
    for (const product of data) {
      // Insert each data object into the database
      await postOrderQuery({ ...product });
    }

    console.log(req.body);
    res.send("order successful!");
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
};
