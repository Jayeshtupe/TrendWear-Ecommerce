const initializeDatabase = require("./db/db.connect")
const Product = require("./models/product.models")
const Category = require("./models/category.models")
const WishList = require("./models/wishList.models")
const Cart = require("./models/cart.models")
const Address = require("./models/address.models")
const Order = require("./models/order.models")
const express = require("express")
const cors = require("cors")
const corsOptions = {
    origin: "*",
    credential: true
}

initializeDatabase()

const app = express()
app.use(express.json())
app.use(cors(corsOptions))


// const updateProducts = async () => {
//     try {
//         const result = await Product.updateMany({}, {
//             $set: {
//                 quantity: 0,  // Set a default value
               
//             }
//         });
//         console.log("Products Updated:", result);
//     } catch (error) {
//         console.error("Error updating products:", error);
//     } 
// };

// updateProducts();

async function updatePricing(productId, updateData){
    try{
        const updatePrice = await Product.findByIdAndUpdate(productId, updateData, {new: true})
        return updatePrice
    }catch(error){
        throw error
    }
}

app.put("/products/:productId", async(req, res) => {
    try{
        const updatedPricing = await updatePricing(req.params.productId, req.body)
        if(updatedPricing){
            res.status(200).json({message: "Pricing Updated successfully.", updatedPricing})
        }else{
            res.status(404).json({error: "404 not found."})
        }
    }catch(error){
        res.status(500).json({ error: "Internal Server Error" });
    }
})


async function createProduct(newProduct){
    try{
        const product = new Product(newProduct)
        const saveProduct = await product.save()
        return saveProduct
    }catch(error){
        throw error
    }
}

app.post("/products", async (req, res) => {
    try{
        const createdProduct = await createProduct(req.body)
        if(createdProduct){
            res.status(200).json({Message: "Product created successfully."})
        }else{
            res.status(404).json({Error: "Product not found."})
        }
    }catch(error){
        res.status(500).json({Error: "Failed to add product details.", error})
    }
})

app.get("/products", async (req, res) => {
    try{
        const fetchedProducts = await Product.find()
        res.json(fetchedProducts)
    }catch(error){
        throw error
    }
})

async function getProductById(productId){
    try{
        const product = await Product.findById(productId)
        return product
    }catch(error){
        throw error
    }
}

app.get("/products/:productId", async (req, res) => {
    try {
        const productById = await getProductById(req.params.productId);
        if(productById) {
            res.status(200).json({Message: "Product found.", product: productById});
        } else {
            res.status(404).json({Error: "Product not found."});
        }
    } catch(error) {
        res.status(500).json({Error: "Failed to get product by its Id.", error});
    }
});

async function deleteProducts(productId) {
    try{
        const product = await Product.findByIdAndDelete(productId)
        return product
    }catch(error){
        throw error
    }
}

app.delete("/products/:productId", async (req, res) => {
    try{
        const deletedProduct = await deleteProducts(req.params.productId)
        if(deletedProduct){
            res.status(200).json({message: "Product deleted successfully."})
        }else{
            res.status(404).json({error: "Product not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete Product by its Id.", error})
    }
})


async function createCategory(newCategory){
    try{
        const category = new Category(newCategory)
        const saveCategory = await category.save()
        return saveCategory
    }catch(error){
        throw error
    }
}

app.post("/categories", async (req, res) => {
    try{
        const createdCategory = await createCategory(req.body)
        if(createdCategory !=0){
            res.status(200).json({Message: "Category created successfully."})
        }else{
            res.status(404).json({Error: "Category not found."})
        }
    }catch(error){
        res.status(500).json({Error: "Failed to add category details.", error})
    }
})

async function getCategories() {
    try{
        const categories = await Category.find()
        return categories
    }catch(error){
        throw error
    }
}

app.get("/categories", async (req, res) => {
    try{
        const fetchedCategories = await getCategories()
        if(fetchedCategories !=0){
            res.status(200).json({Message: "Categories fetched successfully.", category: fetchedCategories})
        }else {
            res.status(404).json({Error: "Category not found."})
        }
    }catch(error){
        res.status(500).json({Error: "Failed to get categories."})
    }
})

async function deleteCategory(categoryId){
    try{
        const category = await Category.findByIdAndDelete(categoryId)
        return category
    }catch(error){
        throw error
    }
}

app.delete("/categories/:categoryId", async (req, res) => {
    try{
        const deletedCategory = await deleteCategory(req.params.categoryId)
        if(deletedCategory){
            res.status(200).json({message: "Category deleted successfully."})
        }else{
            res.status(404).json({error: "Category not found."})
        }
    }catch(error){
        res.status(500).json("Failed to delete category details", error)
    }
})

async function addWishList(newWishList){
    try{
        const wishlist = new WishList(newWishList)
        const saveWishList = wishlist.save()
        return saveWishList
    }catch(error){
        throw error
    }
}

app.post("/wishlist", async (req, res) => {
    try{
        const addedWishList = await addWishList(req.body)
        if(addedWishList !=0){
            res.status(200).json("Added to wishlist.")
        }else{
            res.status(404).json("404, not found.")
            console.error(error)
        }
    }catch(error){
        res.status(500).json({error: "Failed to add wishList"})
        console.error(error)
    }
})

async function getWishList(){
    try{
        const wishList = await WishList.find()
        return wishList
    }catch(error){
        throw error
    }
}

app.get("/wishlist", async (req, res) => {
    try{
        const fetchedWishList = await getWishList()
        if(fetchedWishList !=0){
            res.status(200).json({message: "Wishlist fetched successfully." , wishlist: fetchedWishList})
        }else {
            res.status(404).json({error: "Wishlist not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to get wishList details, server error."})
    }
})

async function deleteWishlist(wishlistId){
    try{
        const wishlist = await WishList.findByIdAndDelete(wishlistId)
        return wishlist
    }catch(error){
        throw error
    }
}

app.delete("/wishlist/:wishlistId", async (req, res) => {
    try{
        const deletedWishlist = deleteWishlist(req.params.wishlistId)
        if(deletedWishlist){
            res.status(200).json({message: "wishlist product deleted successully."})
        }else {
            res.status(404).json({error: "Wishlist product not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete wishlist."})
    }
})

// async function addToCart(newCart){
//     try{
//         const cart = Cart(newCart)
//         const savedCart = cart.save()
//         return savedCart
//     }catch(error){
//         throw error
//     }
// }



// Move Product from Wishlist to Cart
app.post("/cart", async (req, res) => {
    try {
        console.log("Received Cart Data:", req.body);

        const { name, imageUrl, originalPrice, discountedPrice, size, quantity, discount } = req.body;

        if (!name || !imageUrl || !originalPrice || !discountedPrice || !size) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newCartItem = new Cart({
            name,
            imageUrl,
            originalPrice,
            discountedPrice,
            size,
            quantity: quantity || 1,
            discount,
        });

        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


async function getCartProducts() {
    try {
        const cartProducts = await Cart.find();
        return cartProducts;
    } catch (error) {
        throw error;
    }
}

app.get("/cart", async (req, res) => {
    try {
        const fetchedCartProducts = await getCartProducts();

        if (fetchedCartProducts.length > 0) {  
            res.status(200).json({
                message: "Cart Products fetched successfully.",
                cart: fetchedCartProducts
            });
        } else {
            res.status(404).json({ error: "Cart is empty." });  
        }
    } catch (error) {
        console.error("Error fetching cart:", error); 
        res.status(500).json({ error: "Failed to get cart products." });
    }
});


async function deleteCartProduct(cartId){
    try{
        const product = await Cart.findByIdAndDelete(cartId)
        return product
    }catch(error){
        throw error

    }
}

app.delete("/cart/:cartId", async (req, res) => {
    try{
        const deletedProduct = await deleteCartProduct(req.params.cartId)
        if (deletedProduct){
            res.status(200).json({message: "Product deleted from cart successfully."})
        } else {
            res.status(404).json({error: "Product not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete cart product."})
    }
})


async function updateCartById(productId, updateData) {
    try{
        const cart = await Cart.findByIdAndUpdate(productId, updateData, {new: true, runValidators: true})
        return cart 
    }catch(error){
        throw error
    }
}

app.patch("/cart/:productId", async (req, res) => {
    try{
        const updatedCart = await updateCartById(req.params.productId, req.body)
        if(updatedCart !=0){
            res.status(200).json({message: "Cart updated successfully."})
        } else {
            res.status(404).json({ message: "Product not found in cart." })
        }
    }catch(error){
        res.status(500).json({ error: "Failed to update data, server error." })
    }
})

async function addAddress(newAddress){
    try{
        const address = Address(newAddress)
        const savedAddress = await address.save()
        return savedAddress
    }catch(error){
        throw error
    }
}


app.post("/address", async (req, res) => {
    try{
        const addedAddress = await addAddress(req.body)
        if(addedAddress.length !=0){
            res.status(200).json({message: "Address added successfully.", address: addedAddress})
        }else {
            res.status(404).json({error: "404 not found."})
        }
    }catch(error){
        console.error(error.message)
    }
})

async function updateAddress(addrId, updateData){
    try{
        const address = await Address.findByIdAndUpdate(addrId, updateData, {new: true})
        return address
    }  catch(error){
        throw error
    }
}

app.post("/address/:addrId", async (req, res) => {
    try{
        const updatedAddr = await updateAddress(req.params.addrId, req.body)
        if(updatedAddr !=0){
            res.status(200).json({message: "Address updated successfully.", address: updatedAddr})
        } else{
            res.status(404).json({error: "Address not found to update."})
        }
    }catch(error){
        console.error(error)
        res.status({error: "Failed to update address."})
    }
})

async function deleteAddr(addrId){
    try{
        const addr = await Address.findByIdAndDelete(addrId)
        return addr
    }catch(error){
        throw error
    }
}

app.delete("/address/:addrId", async (req, res) => {
    try{
        const deletedAddr = await deleteAddr(req.params.addrId)
        if (deleteAddr){
            res.status(200).json({message: "Address deleted successfully"})
        } else {
            res.status(404).json({error: "Address not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to delete address"})
    }
})

async function getAddress() {
    try {
        const address = await Address.find()
        return address
    } catch(error){
        throw error
    }
}

app.get("/address", async (req, res) => {
    try{
        const fetchedAddress = await getAddress()
        if(fetchedAddress.length != 0){
            res.status(200).json({message: "Address fetched successfully.", address: fetchedAddress})
        } else {
            res.status(404).json({message: "Address not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to get address."})
    }
})


app.post("/placedOrder", async (req, res) => {
    try {
        const { addressId, items } = req.body;

        if (!addressId || !items || items.length === 0) {
            return res.status(400).json({ error: "Invalid order data" });
        }

        // Create a new order
        const newOrder = new Order({
            addressId,
            items,
            orderDate: new Date(),
            status: "Placed"
        });

        // Save to database
        await newOrder.save();

        res.json({ order: newOrder, message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ error: "Failed to place order" });
    }
});

async function getOrders(){
    try{
        const order = await Order.find()
        return order
    } catch(error){
        throw error
    }
}

app.get("/placedOrder", async (req, res) => {
    try{
       const fetchedOrders = await getOrders()
        if(fetchedOrders.length != 0){
            res.status(200).json({message: "Orders fetched successfully.", orders: fetchedOrders})
        } else {
            res.status(404).json({error: "Orders not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to get Placed order's details."})
    }
})



const PORT = 5000
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})