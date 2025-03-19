import { Order, OrderItem } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Vendor } from "../models/vendor.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
const userOrder = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start transaction

    try {
        const {order_items,customer,totalAmount } = req.body;

        if (!order_items || order_items.length === 0) {
            throw new ApiError(400, "Missing required fields");
        }

        let totalPrice = 0;
        const createdOrderItems = [];

        // ✅ Step 1: Create the order FIRST
        const order = new Order({
            user: req.user._id,
            phone : customer['phone'],
            address : customer['address'],
            order_price: 0, // Will update later
            order_items: [],
            payment_status: "UNPAID",
            status: "PENDING",
        });

        const savedOrder = await order.save({ session });

        // ✅ Step 2: Process Order Items
        for (const item of order_items) {
            const vendor = await Vendor.findById(item.vendor).session(session);
            if (!vendor) throw new ApiError(400, `Vendor not found: ${item.vendor_id}`);

            const product = await Product.findById(item._id).session(session);
            if (!product) throw new ApiError(400, `Product not found: ${item._id}`);

            if (product.stock_quantity < item.quantity) {
                throw new ApiError(400, `Not enough stock for product: ${product.name}`);
            }

            totalPrice += item.price * item.quantity;

            const orderItem = new OrderItem({
                order: savedOrder._id, // ✅ Now assigned correctly
                vendor: vendor._id,
                product: item._id,
                quantity: item.quantity,
                price: 100,
            });

            const savedOrderItem = await orderItem.save({ session });
            createdOrderItems.push(savedOrderItem._id);

            product.stock_quantity -= item.quantity;
            await product.save({ session });
        }

        // ✅ Step 3: Update the order with total price and items
        savedOrder.order_price = totalPrice;
        savedOrder.order_items = createdOrderItems;
        await savedOrder.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Order created successfully", order: savedOrder });

    } catch (error) {
        await session.abortTransaction(); // ❌ Rollback on failure
        session.endSession();
        res.status(500).json({ error: error.message });
    }
});


export {userOrder}