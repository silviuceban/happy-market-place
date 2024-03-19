import { OrderParams } from "../../models/index.js";
import { knexInstance } from "../pool.js";
import { v4 as uuidv4 } from "uuid";

export async function postOrderQuery(orderParams: OrderParams) {
  const {
    customerId,
    paymentMethod,
    productId,
    quantity,
    shippmentAddress,
    unitPrice,
  } = orderParams;

  const orderId = uuidv4();
  const orderDetailsId = uuidv4();

  const queryOrders = knexInstance("orders").insert([
    {
      id: orderId,
      customerId,
      orderDate: new Date(),
      totalAmount: 0,
      shipDate: new Date(),
      shippmentAddress,
      paymentMethod,
      status: "pending",
    },
  ]);

  const queryrderDetails = knexInstance("orderDetails").insert([
    {
      id: orderDetailsId,
      orderId,
      productId,
      quantity,
      unitPrice,
    },
  ]);

  const resOrders = await queryOrders;
  const resDetails = await queryrderDetails;

  console.log(resDetails);

  return;
}
