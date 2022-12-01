import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { HOST } from "../utils/constants";
import { CheckoutDetail, CheckoutItem, Roles } from "../utils/types";

const useCheckout = () => {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutDetail>({
    role: Roles.DEFAULT,
    items: [],
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>();

  const checkTotalItem = useMemo(
    () =>
      checkoutItems?.items?.reduce((acc, value) => acc + +value.quantity, 0),
    [checkoutItems?.items]
  );

  const handleChangeRoles = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as Roles;
    setCheckoutItems((prv: CheckoutDetail) => ({
      ...prv,
      role,
    }));
  }, []);

  const handleUpdateQuantity = useCallback(
    (id: string, type: "incre" | "decre") => {
      const updatedQuantity = checkoutItems?.items?.map(
        (item: CheckoutItem) => {
          if (id === item.id) {
            if (type === "decre" && item.quantity <= 0) return item;
            else
              return {
                ...item,
                quantity:
                  type === "incre" ? item.quantity + 1 : item.quantity - 1,
              };
          } else {
            return item;
          }
        }
      );
      setCheckoutItems((prv: CheckoutDetail) => ({
        ...prv,
        items: updatedQuantity,
      }));
    },
    [checkoutItems?.items]
  );

  const handleOrder = useCallback(async () => {
    const customPayloadOrder = checkoutItems?.items?.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      const responseOrder = await fetch(`${HOST}/order`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: checkoutItems.role,
          items: customPayloadOrder,
        }),
      });
      const { data } = await responseOrder.json();

      setOrderData(data);
    } catch (error) {
      console.warn(error);
      setError(true);
    }
  }, [checkoutItems]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${HOST}/products`);
        const { data } = await response.json();

        const customPayload: CheckoutItem[] = data.map(
          (item: CheckoutItem) => ({
            ...item,
            quantity: 0,
          })
        );

        if (data) {
          setCheckoutItems((prv) => ({ ...prv, items: customPayload }));
        }
      } catch (error) {
        console.warn(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return {
    error,
    orderData,
    loading,
    checkTotalItem,
    data: checkoutItems.items,
    role: checkoutItems.role,
    handleChangeRoles,
    handleOrder,
    handleUpdateQuantity,
  };
};

export default useCheckout;
