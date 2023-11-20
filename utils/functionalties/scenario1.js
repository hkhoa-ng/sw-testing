import filter from "../filter";
import map from "../map";
import reduce from "../reduce";
import compact from "../compact";
import words from "../words";
import castArray from "../castArray";
import get from "../get";
import capitalize from "../capitalize";
import add from "../add";
import ceil from "../ceil";
import toNumber from "../toNumber";
// Example product data
const products = [
  { id: 1, name: 'Apple', category: 'Fruits', price: 2.5, description: 'Fresh red apple' },
  { id: 2, name: 'Banana', category: 'Fruits', price: 1.5, description: 'Ripe banana' },
  { id: 3, name: 'Chair', category: 'Furniture', price: 45.0, description: 'Comfortable chair' },
];

// Step 1: User browses the product catalog
export function browseProductCatalog(products, category) {
  const filteredProducts = filter(products, (product) => product.category === category);
  const displayProducts = map(filteredProducts, (product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
    };
  });
  return displayProducts;
}

// Step 2: User performs a product search
export function searchProduct(products, searchKey) {
  const filteredProducts = filter(products, (product) =>
    words(product.name).includes(searchKey.toLowerCase())
  );
  const displayProducts = map(filteredProducts, (product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
    };
  });
  return displayProducts;
}

// Step 3: User filters search results by product properties
export function filterSearchResults(products, filterOptions) {
  let filteredProducts = products;

  // Filtering by minimum price using reduce
  if (filterOptions.minPrice !== undefined) {
    filteredProducts = reduce(filteredProducts, (result, product) => {
      if (product.price >= filterOptions.minPrice) {
        result.push(product);
      }
      return result;
    }, []);
  }

  // Filtering by category using filter
  if (filterOptions.category !== undefined) {
    filteredProducts = filter(filteredProducts, (product) => product.category === filterOptions.category);
  }

  // Mapping filtered products for display using map
  const displayProducts = map(filteredProducts, (product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      // Other product details...
    };
  });

  // Simulating compact functionality (removing blank values)
  const compactDisplayProducts = compact(displayProducts);

  // Simulating capitalize functionality (capitalizing fields)
  const capitalizedDisplayProducts = map(compactDisplayProducts, (product) => {
    return {
      name: capitalize(product.name),
      description: capitalize(product.description),
      price: product.price,
      // Other capitalized fields...
    };
  });

  return capitalizedDisplayProducts;
}

// Step 4: User adds product to their shopping cart Interaction
export function addToCart(selectedProducts, shoppingCart) {
  // Cast selectedProducts to an array
  const productsToAdd = castArray(selectedProducts);

  // Iterate over each product to add them to the shopping cart
  productsToAdd.forEach((product) => {
    const productId = get(product, 'id'); // Assuming there's an 'id' field in each product
    const existingItem = shoppingCart.find((item) => get(item, 'id') === productId);

    if (existingItem) {
      // If the product already exists in the cart, increase its quantity
      existingItem.quantity = add(existingItem.quantity, 1);
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      shoppingCart.push({
        id: productId,
        name: get(product, 'name', 'Unknown Product'),
        price: get(product, 'price', 0), // Assuming each product has a 'price' field
        quantity: 1, // Adding a single quantity for the new product
        // Other product details to include in the shopping cart...
      });
    }
  });

  return shoppingCart; // Return the updated shopping cart
}

// Step 5: User reviews and interacts with their shopping cart content
export function interactWithCart(shoppingCart, productId, quantityChange) {
  const cartItemIndex = shoppingCart.findIndex((item) => item.id === productId);

  if (cartItemIndex !== -1) {
    shoppingCart[cartItemIndex].quantity = add(
      shoppingCart[cartItemIndex].quantity,
      quantityChange
    );

    if (shoppingCart[cartItemIndex].quantity <= 0) {
      shoppingCart.splice(cartItemIndex, 1);
    }
  }
  const totalPrice = reduce(
    shoppingCart,
    (acc, item) => add(acc, item.price * item.quantity),
    0
  );

  return {
    cartItems: shoppingCart,
    totalPrice: totalPrice,
  };
}

// Step 6: User accepts their order, add information, and checkout
export function checkout(shoppingCart, paymentInfo) {
  const totalPrice = reduce(
    shoppingCart,
    (acc, item) => add(acc, item.price * item.quantity),
    0
  );
  const roundedTotalPrice = ceil(toNumber(totalPrice), 2);
  const orderConfirmation = {
    cartItems: shoppingCart,
    totalPrice: roundedTotalPrice,
    paymentInfo: paymentInfo,
  };

  return orderConfirmation; // Replace 'USD' with the appropriate currency
}

// Step 7: Payment process
export function makePayment(paymentInfo) {
  // Simulate interaction with third-party payment solution
  const paymentResponse = "25.99 USD"; // Simulated payment response from the third-party solution
  const paymentAmount = toNumber(paymentResponse);

  const transactionRecord = {
    amount: paymentAmount,
    currency: 'USD', 
    status: 'successful',
    timestamp: new Date().toISOString(),
    paymentInfo: paymentInfo,
  };

  const paidItems = filter(paymentResponse.split(' '), item => !isNaN(parseFloat(item)));

  const orderConfirmation = {
    message: `Your payment of ${paymentAmount} ${transactionRecord.currency} was successful.`,
    itemsPaidFor: paidItems,
    contactMethod: 'SMS', 
    contactAddress: '+1234567890',
  };

  return { transactionRecord, orderConfirmation };
}

// Step 8: User confirms their order has been placed successfully
export function confirmOrderPlacement(orderDetails) {
  const orderConfirmation = {
    message: 'Your order has been successfully placed!',
    contactMethod: 'SMS',
    contactAddress: '+1234567890',
  };

  const paymentStatus = 'Payment successful';
  const orderedItemNames = get(orderDetails, 'items', []).map(item => item.name);

  const confirmationDetails = {
    confirmationMessage: orderConfirmation.message,
    contactMethod: orderConfirmation.contactMethod,
    contactAddress: orderConfirmation.contactAddress,
    paymentStatus: paymentStatus,
    orderedItems: orderedItemNames,
  };

  return confirmationDetails;
}