import React from "react";
import { Button } from "~/components/ui/button";

function Reservations() {
  return (
    <React.Fragment>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-primary md:text-2xl">
          Reservations
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reservations;
