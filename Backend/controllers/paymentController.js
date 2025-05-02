const Razorpay = require('razorpay');

const createOrder = async (req, res) => {
    try {
        const { amount, currency, plan, period } = req.body;
        
        res.status(200).json({
            success: true,
            message: 'Payment initiated successfully'
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing payment'
        });
    }
};

module.exports = {
    createOrder
};