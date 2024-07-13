export type InitActionType = {
  type: string
  url: string,
};

export type CategoryType = {
  slug: string,
  name: string,
  url: string,
};

type ProductDimensionType = {
  width: number,
  height: number,
  depth: number,
};

type ProductReviewType = {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string,
}; 

type ProductMetaType = {
  createdAt: string,
  updatedAt: string,
  barcode: string,
  qrCode: string,
};

export type ProductType = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags: string[],
  brand: string,
  sku: string,
  weight: number,
  dimensions: ProductDimensionType,
  warrantyInformation: string,
  shippingInformation: string,
  availabilityStatus:  string,
  reviews: ProductReviewType[],
  returnPolicy: string,
  minimumOrderQuantity: number,
  meta: ProductMetaType,
  images: string[],
  thumbnail: string,
};

export type ProductResponseType = {
  limit: number,
  skip: number,
  total: number,
  products: ProductType[],
};
