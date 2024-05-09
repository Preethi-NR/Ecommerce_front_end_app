import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import {
  getCartTotal,
  removeItem,
  updateQuantity,
} from "../../redux/CartSlice";
import Heading from "../../common/Heading";

export default function Cart() {
  const increaseQty = (cartProductId, currentQty) => {
    const newQty = currentQty + 1;
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  const decreaseQty = (cartProductId, currentQty) => {
    const newQty = Math.max(currentQty - 1, 1);
    dispatch(updateQuantity({ id: cartProductId, quantity: newQty }));
  };

  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState(""); // State to store the entered coupon code
  const {
    data: cartProducts,
    totalAmounts,
    deliveryCharge,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(getCartTotal()); // Dispatch getCartTotal before removing item
    dispatch(removeItem({ id: itemId }));
  };
  const handleApplyCoupon = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const specialCouponCode = "SPECIAL10"; // Assume this is the special coupon code

    if (couponCode === specialCouponCode) {
      // Apply a 10% discount if the special coupon code matches
      const discountAmount = totalAmounts * 0.1; // 10% discount
      setDiscount(discountAmount);

      // Wait for 10 seconds before proceeding to checkout
      setTimeout(() => {
        handleProceedToCheckout();
      }, 20000); // 10 seconds in milliseconds
    } else {
      // Clear the discount if the entered coupon code is incorrect
      setDiscount(0);
    }
  };


  const handleProceedToCheckout = () => {
    document.getElementById("stripeCheckoutBtn").click();
  };

  const emptyCartMsg = (
    <h4 className="container text-center p-4">Your Cart is Empty</h4>
  );

  const onToken = (token) => {
    // You can send the token to your server to make a charge
    console.log(token);
  };
  const publishableKey =
    "pk_test_51PE5vQIJIWgIoh2yGKy0JIGZwqwLVCAy0NMRAeOelAr1rfrAQ7iozHeqnDaBcNJDfokinOiMEhIEc8a7XTjFz7ay006SOtjBZ1";

  return (
    <>
      <Heading title="Home" subtitle="Cart" />
      {cartProducts.length === 0 ? (
        emptyCartMsg
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cartProducts.map((cartProduct) => (
                    <tr key={cartProduct.id}>
                      <td className="align-middle">
                        <img
                          src={cartProduct.product_img}
                          alt="img"
                          style={{ width: "50px" }}
                        />{" "}
                        {cartProduct.product_name}
                      </td>
                      <td className="align-middle">{cartProduct.price}</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-minus"
                              onClick={() =>
                                decreaseQty(
                                  cartProduct.id,
                                  cartProduct.quantity
                                )
                              }
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm bg-secondary border-0 text-center"
                            value={cartProduct.quantity || 1}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-primary btn-plus"
                              onClick={() =>
                                increaseQty(
                                  cartProduct.id,
                                  cartProduct.quantity
                                )
                              }
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {cartProduct.totalPrice}
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(cartProduct.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)} // Update couponCode state on change
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      onClick={handleApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>{totalAmounts}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">{deliveryCharge}</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>{totalAmounts + deliveryCharge - discount}</h5> {/* Subtract discount from total */}
                  </div>

                  <button
                    id="continueShoppingBtn" // Continue Shopping button
                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                    onClick={() => { window.location.href = '/shop'; }} // Handle click event to redirect
                  >
                    Continue Shopping
                  </button>

                  {cartProducts.length > 0 && (
                    <StripeCheckout
                      token={onToken}
                      stripeKey={publishableKey}
                      amount={(100 * (totalAmounts - discount)).toFixed(2)}
                      name="Shop Nest Payment Gateway"
                      currency="USD"
                      label="Proceed to Checkout"
                      className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                      id="stripeCheckoutBtn"
                    />
                  )}


                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
