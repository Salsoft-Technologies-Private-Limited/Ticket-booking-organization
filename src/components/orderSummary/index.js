import React from "react";

function OrderSummary({subTotal}) {
  // const subTotal = useSelector((state) => state.cart.subTotal);
  const vatAmount = (subTotal / 100) * 5;
  return (
    <div className="summary">
      <div className="summaryinner">
        {/* <List itemLayout="horizontal">
          <List.Item>
            <List.Item.Meta
              title={
                <div className="summaryList">
                  {" "}
                  <span>Subtotal</span> <span>{subTotal}</span>
                </div>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={
                <div className="summaryList">
                  {" "}
                  <span>Tax 0%</span> <span>{tax}</span>
                </div>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={
                <div className="summaryList">
                  {" "}
                  <span>Grand Total</span> <span>{subTotal + tax}</span>
                </div>
              }
            />
          </List.Item>
        </List> */}
        <div class="details-card price-summary-card">
          <h2 class="price-summary-heading">Price Summary</h2>
          <div class="price-summary-detail">
            <p>Subtotal</p>
            <p>${subTotal + ".00"}</p>
          </div>
          <div class="price-summary-detail">
            <p>VAT</p>
            <p>${vatAmount + ".00"}</p>
          </div>
          <div class="price-summary-detail">
            <p>Delivery Charges</p>
            {subTotal ? (<p>$10.00</p>) : (<p>$0.00</p>)}
          </div>
        </div>
        <div class="total-paid">
          <p>Total Amount</p>
          <p>${subTotal + vatAmount + 10.0 + ".00"}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
