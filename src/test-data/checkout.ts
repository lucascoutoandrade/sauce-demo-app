export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const validCheckoutCustomer: CheckoutCustomer = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '12345'
};

export const checkoutRequiredFieldErrors = {
  firstName: 'Error: First Name is required',
  lastName: 'Error: Last Name is required',
  postalCode: 'Error: Postal Code is required'
} as const;

export const orderConfirmationHeader = 'Thank you for your order!';
