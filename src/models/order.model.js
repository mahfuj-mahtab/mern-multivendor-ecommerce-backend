import mongoose from 'mongoose';


const orderItemSchema = new mongoose.Schema({
    order:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps: true});
const paymentSchema = new mongoose.Schema({
    order:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PAID', 'FAILED', 'REFUNDED','UNPAID'],
        default: 'FAILED'
    },
    credential: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});
const trackingHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
}, { _id: false }); // Prevents MongoDB from adding an unnecessary `_id` field inside tracking_history

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    order_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING','PROCESSING','SHIPPED','COMPLETED','CANCELLED','HOLD'],
        default: 'PENDING'
    },
    payment_status: {
        type: String,
        enum: ['PAID', 'UNPAID', 'REFUNDED'],
        default: 'UNPAID'
    },
    tracking_info: {
        courier: { type: String, default: '' },
        tracking_number: { type: String, default: '' }
    },
    tracking_history: [trackingHistorySchema],
    order_items: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    payment : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }
}, { timestamps: true });


orderSchema.index({ user: 1, status: 1 });   // ✅ Fast search for orders by user & status
orderSchema.index({ vendor: 1 });           // ✅ Fast search for vendor orders
orderItemSchema.index({ order: 1 });        // ✅ Fast search for items by order
paymentSchema.index({ order: 1 });          // ✅ Fast payment lookup

export const Order = mongoose.model("Order", orderSchema);

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export const Payment = mongoose.model("Payment", paymentSchema);