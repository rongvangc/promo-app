export const enum Roles {
  DEFAULT = "default",
  MICROSOFT = "microsoft",
  AMAZON = "amazon",
  FACEBOOK = "facebook",
}

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type CheckoutItem = ProductItem & { quantity: number };

export type CheckoutDetail = {
  role: Roles;
  items: CheckoutItem[];
};
