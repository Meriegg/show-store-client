import LinkGroup from "@/components/LinkGroup";
import ImageCarousel from "../../../../components/ImageCarousel";
import { prisma } from "@/server/db";

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
    <div className="relative flex flex-col gap-4">
      <div className="h-full w-[1px] bg-black absolute left-20 top-0"></div>
      <div className="py-9 px-28 border-b-[1px] border-black">
        <LinkGroup
          links={[
            { text: "Store", href: "/store" },
            { text: product.name, href: `/store/product/${product.id}` },
          ]}
        />
      </div>

      <div className="px-28 py-8 flex items-start">
        <div className="w-[550px] h-[400px]">
          <ImageCarousel
            imageLinks={product.images}
            imageClassName="h-[400px] w-full rounded-xl"
            bgPos="center"
          />
        </div>
        <div className="flex flex-col gap-2" style={{ flexGrow: "2" }}>
          <p>{product.price}$</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
