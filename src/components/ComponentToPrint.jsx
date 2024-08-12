import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  return (
    <div ref={ref}>
      <table className="text-black w-full table-auto text-xl">
        <thead>
          <tr>
            <th className="px-2 py-2">#</th>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Price</th>
            <th className="px-2 py-2">Qty</th>
            <th className="px-2 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart
            ? cart.map((cartProduct, key) => (
                <tr key={key}>
                  <td className="border px-2 py-2">{key + 1}</td>
                  <td className="border px-2 py-2">{cartProduct.name}</td>
                  <td className="border px-2 py-2">${cartProduct.price}</td>
                  <td className="border px-2 py-2">{cartProduct.quantity}</td>
                  <td className="border px-2 py-2">
                    ${cartProduct.totalAmount}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <h2 className="text-black mt-3 text-xl px-3">Total Amount : ${totalAmount}</h2>
    </div>
  );
});
