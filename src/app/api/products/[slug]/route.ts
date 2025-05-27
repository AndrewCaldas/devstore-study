import { z } from "zod";
import data from "../data.json";

const slugSchema = z.string();

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> } // insiro uma Promise aqui
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { slug } = await params;

  const parsedSlug = slugSchema.parse(slug);

  const product = data.products.find((product) => product.slug === parsedSlug);

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  return Response.json(product);
}
