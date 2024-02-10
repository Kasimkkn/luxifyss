import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [cards, setCards] = useState<ReactElement[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  // const words = order.;
  // const limitedName = words.slice(0, 3).join(" ");
  useEffect(() => {
    if (data) {
      setCards(
        data.orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-details">
              <div className="order-info">
                <p>Order ID: {order._id}</p>
                <p>Order Status: <span className={`status ${order.status}`}>{order.status}</span></p>
                <p>
                  Shipping Address:{" "}
                  {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}
                </p>
                <p>Shipping Charges: {order.shippingCharges}</p>
                <p>Discount: {order.discount}</p>
                <p>Grand Total: {order.total}</p>
              </div>
              <div className="order-items">
                <h3>Order Items:</h3>
                {order.orderItems.map((item) => (
                  <div className="item" key={item.productId}>
                    <div
                      className="product-photo"
                      style={{
                        background: `linear-gradient(to bottom,black,white`,
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                        }}
                        src={`${item.photo}`}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="item-details">
                      <Link to={`/product/${item.productId}`}>
                        Name: {item.name.split("").slice(0,25).join("")}...
                      </Link>
                      <p>Price: {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      );
    }
  }, [data]);

  return (
    <div className="order-container">
      <h1>My Orders</h1>
      {isLoading ? (
        <Skeleton length={20} />
      ) : (
        <div className="cards-container">{cards}</div>
      )}
    </div>
  );
};

export default Orders;
