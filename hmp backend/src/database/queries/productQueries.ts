import { knexInstance } from "../pool.js";

export async function getProductsQuery(take?: string, skip?: string) {
  const query = knexInstance("products")
    .select("p.*")
    .avg("r.rate as average_rating")
    .count("r.rate as total_ratings")
    .from("products as p")
    .leftJoin("ratings as r", "p.id", "r.productId")
    .groupBy("p.id")
    .modify((builder) => {
      if (take) builder.limit(Number(take));
      if (skip) builder.offset(Number(skip));
    });

  const queryCount = knexInstance("products").count("*");

  const items = await query;
  const count = await queryCount;

  return { items, total: Number(count[0].count) };
}

export async function getProductByIdQuery(id: string) {
  const query = knexInstance("products")
    .select("p.*")
    .avg("r.rate as average_rating")
    .count("r.rate as total_ratings")
    .from("products as p")
    .leftJoin("ratings as r", "p.id", "r.productId")
    .groupBy("p.id")
    .where((builder) => {
      builder.where("p.id", id);
    });

  const result = await query;

  return { ...result[0] };
}
