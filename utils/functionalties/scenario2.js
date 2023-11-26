import get from "../get";
import eq from "../eq";
import compact from "../compact";
import add from "../add";
import capitalize from "../capitalize";
import filter from "../filter";
import isArrayLikeObject from "../isArrayLikeObject";

// Step 1: Producer signs into the e-commerce store
export function producerLogin(email, password, producerCredentials) {
  if (!email || !password) {
    return { success: false, message: 'Invalid credentials' };
  }

  const foundProducer = filter(producerCredentials,
    (cred) => eq(cred.email, email) && eq(cred.password, password)
  );

  if (foundProducer.length !== 0 && foundProducer[0].length !== 0) {
    return { success: true, message: 'Login successful. Access granted.' };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
}


// Step 2: Producer adds new product
export function addNewProduct(productInfo, productsDatabase) {
  if (!productInfo.name || !productInfo.category || !productInfo.price){
    return {
      success: false,
      message: 'Missing required fields.',
      productsDatabase
    }
  }
  const { name, price, ...otherAttributes } = productInfo;
  const newProduct = {
    ...otherAttributes,
    name: capitalize(name),
    price: parseFloat(price),
    quantity: 0
  };

  productsDatabase = compact(productsDatabase);
  newProduct.quantity = add(newProduct.quantity, 1);
  productsDatabase.push(newProduct);

  return { 
    success: true, 
    message: 'Product added successfully.',
    productsDatabase
  };
}

// Step 3: Request transmission
export function requestTransmission(productData) {
  const { name, description, category, price } = productData;
  const validatedData = name && description && category && price;

  if (validatedData) {
    // storeProductInDatabase(validatedData);
    return { success: true, message: 'Product added to the database.' };
  } else {
    return { success: false, message: 'Invalid product data.' };
  }

}

// Step 4:
export function validateProductInfo(productInfo) {

  const { name, description, category, price } = productInfo;
  if (!name || !description || !category || !price) {
    return { valid: false, message: 'Required fields cannot be empty.' };
  }
  if (typeof price !== 'number' || isNaN(price) || price <= 0) {
    return { valid: false, message: 'Price should be a valid number greater than 0.' };
  }

  if (!isArrayLikeObject(category)) {
    return { valid: false, message: 'Categories should be an array-like object.' };
  }

  return { valid: true, message: 'Product information is valid.' };

}

// Step 5: Product Addition (Back-End)
export function addProductToDatabase(productDetails, db) {
    const existingProductQuantity = 1
    productDetails.quantity = add(productDetails.quantity, existingProductQuantity);
    db.insert('products', productDetails);
};


// Step 6: Confirmation (Front-End)
export function showProductAdditionConfirmation(productDetails) {
  const productName = get(productDetails, 'name', 'New Product');
  return productName
}
