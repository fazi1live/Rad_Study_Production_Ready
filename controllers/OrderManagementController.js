

const PlaceOrder = async(req, res) => {
    try {
        console.log(req.body);
        res.json({
            Message:'Got it',
            Data:true,
            Result:true
        })
    } catch (error) {
        req.json({
            Message:error.message,
            Data:false,
            Result:null
        })
    }
}

module.exports = {
    PlaceOrder
}