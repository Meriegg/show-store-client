import CheckoutForm from "@/components/application/Cart/CheckoutForm";
import CartItemsDisplay from "@/components/application/Cart/ItemsDisplay";

const CartPage = () => {
  return (
    <div className="sectionPadding flex flex-col gap-1">
      <h1 className="my-2 text-4xl font-semibold">Checkout</h1>
      <div className="w-full flex">
        <div className="flex-grow">
          <CartItemsDisplay />
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
};

export default CartPage;
