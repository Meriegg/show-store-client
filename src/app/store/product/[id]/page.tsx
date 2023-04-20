import LinkGroup from "@/components/LinkGroup";
import ImageCarousel from "../../../../components/ImageCarousel";
import AddToCartForm from "@/components/application/Store/AddToCartForm";
import { prisma } from "@/server/db";
import type { Product } from "@prisma/client";

const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      types: true,
    },
  });
  if (!product) {
    return {
      error: "Could not find product!",
      product: null,
    };
  }

  return {
    error: null,
    product,
  };
};

const ViewProduct = async ({ params }: { params: { id: string | null } }) => {
  const { error, product } = await getProduct(params.id || "");

  if (error) {
    return <p className="w-full text-center font-semibold my-6 text-red-600 text-base">{error}</p>;
  }

  if (!product) {
    return (
      <p className="w-full text-center font-semibold my-6 text-red-600 text-base">
        Could not find product!
      </p>
    );
  }

  return (
    <div className="relative flex flex-col gap-4 w-full">
      <div className="h-[100vh] w-[1px] bg-black absolute left-20 top-0 lg:hidden"></div>
      <div className="py-9 px-28 border-b-[1px] border-black">
        <LinkGroup
          links={[
            { text: "Store", href: "/store" },
            { text: product.name, href: `/store/product/${product.id}` },
          ]}
        />
      </div>

      <div className="px-28 lg:px-2 py-8 flex lg:flex-col lg:gap-12 lg:items-center items-start gap-8 lg:w-full">
        <ImageCarousel
          imageLinks={product.images}
          imageClassName="h-full w-full rounded-xl"
          bgPos="center"
          style={{
            width: "min(600px, 100%)",
            aspectRatio: "16 / 10",
          }}
        />
        <div className="flex flex-col gap-4 font-semibold" style={{ width: "min(400px, 100%)" }}>
          <div className="flex flex-col lg:items-center lg:w-full gap-2 w-fit">
            <p className="text-sm">{product.price}$</p>
            <p className="text-2xl">{product.name}</p>
            <div className="w-full border-b-[1px] border-black" />
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <p className="text-neutral-600">types:</p>
            <div className="flex items-center gap-2 flex-wrap">
              {product.types.map((type) => (
                <p className="text-neutral-900">@{type.name}</p>
              ))}
            </div>
          </div>

          <AddToCartForm product={JSON.parse(JSON.stringify(product)) as Product} />
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
