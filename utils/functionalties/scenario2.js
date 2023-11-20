import get from "../get";
import eq from "../eq";
import compact from "../compact";
import add from "../add";
import toNumber from "../toNumber";
import capitalize from "../capitalize";
import isDate from "../isDate";
import isArrayLikeObject from "../isArrayLikeObject";

// Step 1: Producer signs into the e-commerce store
export function producerLogin(email, password) {
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

  return { success: true, message: 'Product added successfully.' };
}

// Step 3: Request transmission
export function requestTransmission(productData) {
  try {
    const { name, description, category, price } = productData;
    const validatedData = {
      name: capitalize(name),
      description,
      category,
      price: toNumber(price),
    };

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
    if (!isDate(productInfo.createdDate)) {
      return { valid: false, message: 'Invalid createdDate format.' };
    }

    if (!isArrayLikeObject(productInfo.images)) {
      return { valid: false, message: 'Images should be an array-like object.' };
    }

    return { valid: true, message: 'Product information is valid.' };
  } catch (error) {
    console.error('Error in validation:', error);
    return { valid: false, message: 'Error in validating product information.' };
  }
}

// Step 5: Product Addition (Back-End)
export function addProductToDatabase(productDetails) {
  const db = {
    insert: (tableName, data) => {
      console.log(`Adding product to table ${tableName}:`, data);
    },
  };
    productDetails.quantity = add(productDetails.quantity, 1);
    db.insert('products', productDetails);
};


// Step 6: Confirmation (Front-End)
export function showProductAdditionConfirmation(productDetails) {
  const productName = get(productDetails, 'name', 'New Product');
  return productName
}