import "./App.css";
import Error from "./components/Error";
import Loading from "./components/Loading";
import ItemProduct from "./components/Item";
import { userList } from "./utils/constants";
import useCheckout from "./hooks/useCheckout";

function App() {
  const {
    orderData,
    checkTotalItem,
    data,
    error,
    loading,
    role,
    handleChangeRoles,
    handleOrder,
    handleUpdateQuantity,
  } = useCheckout();

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <div className="App">
      <h1>Checkout</h1>
      <div className="container">
        <div className="box user">
          <h4>User buy:</h4>
          <select value={role} onChange={handleChangeRoles}>
            {userList?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="box checkout-container">
          {data.map((prd) => (
            <ItemProduct
              key={prd.id}
              onIncre={() => handleUpdateQuantity(prd.id, "incre")}
              onDecre={() => handleUpdateQuantity(prd.id, "decre")}
              {...prd}
            />
          ))}
        </div>
        <div className="box checkout">
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.name} <span>qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
          <button disabled={checkTotalItem <= 0} onClick={handleOrder}>
            Checkout
          </button>

          {orderData && (
            <div className="order">
              {orderData?.promotion && <h5>{orderData?.promotion}</h5>}
              <ol>
                {orderData?.products?.map((item: any) =>
                  item.quantity ? (
                    <li key={item.product?.name}>
                      {item.product?.name} x{item.quantity}
                    </li>
                  ) : null
                )}
              </ol>
              <b>Total: {orderData?.total}</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
