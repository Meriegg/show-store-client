export const PRODUCT_MAX_PRICE = 1999.99;
export const encryptionAlgorithm = "sha256";
export const cipherAlgorithm = "aes-256-cbc";
export const sessionExpirationDelay = 6 * 60 * 60 * 1000;

export const PRODUCT_SIZES = ['4XL', '3XL', 'XXL', 'XL', "L", "M", "S", "XS", "XXS", "3XS"]

export const StripeTestCards = [
  {
    label: 'Successful payment',
    number: '4242424242424242'
  },
  {
    label: 'Failed payment',
    number: '4000000000009995'
  },
  {
    label: 'Requires authentication',
    number: '4000002500003155'
  },
]