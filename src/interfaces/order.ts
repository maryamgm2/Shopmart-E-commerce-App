export interface OrderProduct {
  imageCover: string;
  title: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface Order {
  _id: string;
  id: number;
  createdAt: string;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  cartItems: OrderItem[];
}

