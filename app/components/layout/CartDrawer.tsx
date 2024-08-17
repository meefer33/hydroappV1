import { Await } from "@remix-run/react";
import { Suspense } from "react";
import { CartMain } from "../CartMain";
import { CartApiQueryFragment } from "storefrontapi.generated";

export default function CartDrawer({cart}: {cart: Promise<CartApiQueryFragment | null>}) {
    return (
      <>
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </>
    );
  }