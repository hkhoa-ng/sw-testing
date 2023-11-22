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


// Step 1: User browses the product catalog
export function browseProductCatalog(products, category) {
  const filteredProducts = filter(products, (product) => product.category.includes(category));
  return filteredProducts;
}

// Step 2: User performs a product search
export function searchProduct(products, searchKey) {
  const filteredProducts = filter(products, (product) =>
    words(product.name).includes(searchKey.toLowerCase()) || words(product.description).includes(searchKey.toLowerCase())
  );
  return filteredProducts;
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
    filteredProducts = filter(filteredProducts, (product) => eq(filter(filterOptions.category, (c) => product.category.includes(c)).length, filterOptions.category.length));
  }


  // Simulating compact functionality (removing blank values)
  const compactDisplayProducts = compact(filteredProducts);

  // Simulating capitalize functionality (capitalizing fields)
  const capitalizedDisplayProducts = map(compactDisplayProducts, (product) => {
    return {
      ...product,
      name: capitalize(product.name),
      description: capitalize(product.description)
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
    const productId = get(product, 'id');
    const existingItem = shoppingCart.find((item) => get(item, 'id') === productId);

    if (existingItem) {
      existingItem.quantity = add(existingItem.quantity, 1);
    } else {
      shoppingCart.push({
        id: productId,
        name: get(product, 'name', 'Unknown Product'),
        price: get(product, 'price', 0),
        quantity: 1,
      });
    }
  });

  return shoppingCart;
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

  return orderConfirmation;
}

// Step 7: Payment process
export function makePayment(paymentInfo, paymentResponse) {
  const paymentAmount = toNumber(paymentResponse);

  const transactionRecord = {
    amount: paymentAmount,
    currency: 'EUR', 
    status: 'successful',
    timestamp: new Date().toISOString(),
    paymentInfo: paymentInfo,
  };

  const paidItems = filter(paymentResponse.split(' '), item => !isNaN(parseFloat(item)));

  const orderConfirmation = {
    message: `Your payment of ${paymentAmount} ${transactionRecord.currency} was successful.`,
    itemsPaidFor: paidItems,
    contactMethod: 'SMS', 
    contactAddress: paymentInfo.phoneNum,
  };

  return { transactionRecord, orderConfirmation };
}

// Step 8: User confirms their order has been placed successfully
export function confirmOrderPlacement(orderDetails, paymentInfo) {
  const orderConfirmation = {
    message: 'Your order has been successfully placed!',
    contactMethod: 'SMS',
    contactAddress: paymentInfo.phoneNum,
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