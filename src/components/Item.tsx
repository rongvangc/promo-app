import { CheckoutItem } from "../utils/types";

type ItemProductType = CheckoutItem & {
  onIncre: () => void;
  onDecre: () => void;
};

const ItemProduct = ({
  id,
  description,
  name,
  price,
  quantity,
  onIncre,
  onDecre,
}: ItemProductType) => {
  return (
    <div className={`item-${id}`}>
      <div className="name">
        <h4>{name}</h4>
        <em>{description}</em>
      </div>
      <div className="price">
        <span>{price.toFixed(2)}$</span>

        <div>
          <button disabled={quantity <= 0} onClick={onDecre}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={onIncre}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ItemProduct;
