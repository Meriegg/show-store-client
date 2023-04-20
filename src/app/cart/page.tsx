import CartItemsDisplay from "@/components/application/Cart/ItemsDisplay";

const CartPage = () => {
  return (
    <div className="sectionPadding">
      <h1 className="my-2 text-4xl font-semibold">Checkout!</h1>
      <CartItemsDisplay />
    </div>
  );
};

export default CartPage;
