import get from "../get";
import eq from "../eq";
import compact from "../compact";
import add from "../add";
import capitalize from "../capitalize";
import isDate from "../isDate";
import isArrayLikeObject from "../isArrayLikeObject";

// Step 1: Producer signs into the e-commerce store
export function producerLogin(email, password, producerCredentials) {
  if (!email || !password) {
    return { success: false, message: 'Invalid credentials' };
  }

  const foundProducer = producerCredentials.find(
    (cred) => eq(cred.email, email) && eq(cred.password, password)
  );

  if (foundProducer) {
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
  const { name, description, category, price, ...otherAttributes } = productInfo;
  const newProduct = {
    name: capitalize(name),
    description,
    category,
    price: parseFloat(price),
    ...otherAttributes,
  };

  const filledProduct = compact(newProduct);
  const productWithQuantity = add(filledProduct, { quantity: 1 });
  productsDatabase.push(productWithQuantity);

  return { 
    success: true, 
    message: 'Product added successfully.',
    productsDatabase
  };
}

// Step 3: Request transmission
export function requestTransmission(productData, existingCategories) {
  try {
    const { name, description, category, price } = productData;
    const validatedData = words(description).includes(name.toLowerCase()) && eq(filter(category, c=>existingCategories.includes(c)).length, category.length);

    if (validatedData) {
      // storeProductInDatabase(validatedData);
      return { success: true, message: 'Product added to the database.' };
    } else {
      return { success: false, message: 'Invalid product data.' };
    }
  } catch (error) {
    console.error('Error in processing:', error);
    return { success: false, message: 'Error processing product data.' };
  }
}

// Step 4:
export function validateProductInfo(productInfo) {
  try {
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
  } catch (error) {
    console.error('Error in validation:', error);
    return { valid: false, message: 'Error in validating product information.' };
  }
}

// Step 5: Product Addition (Back-End)
export function addProductToDatabase(productDetails, db) {
    existingProductQuantity = 1
    productDetails.quantity = add(productDetails.quantity, existingProductQuantity);
    db.insert('products', productDetails);
};


// Step 6: Confirmation (Front-End)
export function showProductAdditionConfirmation(productDetails) {
  const productName = get(productDetails, 'name', 'New Product');
  return productName
}
