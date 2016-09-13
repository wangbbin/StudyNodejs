var mongoose = require('mongoose'),
		Customer = mongoose.model('Customer'),
		Address = mongoose.model('Address'),
		Billing = mongoose.model('Billing');

exports.getCustomer = function (req, res){
	Customer.findOne({userid: 'customerA'})
				.exec(function (err, customer){
					if (!customer){
						res.json(404, {msg: 'Customer Not Found'});
					} else {
						res.json(customer);
					}
				});
};

exports.updateShipping = function (req, res){
	var newShipping = new Address(req.body.updatedShipping);
	Customer.update({userid: 'customerA'}, {$set: {shipping: [newShipping.toObject()]}})
				.exec(function (err, results){
						if (err || results < 1){
							res.json(404, {msg: 'Failed to update shipping'});
						} else {
							res.json({msg: 'Customer shipping updated!'});
						}
				})
};

exports.updateBilling = function (req, res){
	var newBilling = new Billing(req.body.updatedBilling);
	Customer.update({userid: 'customerA'}, {$set: {billing: [newBilling.toObject()]}})
				.exec(function (err, results){
						if (err || results < 1){
							res.json(404, {msg: 'Failed to update billing'});
						} else {
							res.json({msg: 'Customer billing updated!'});
						}
				})
};

exports.updateCart = function (req, res){
	Customer.update({userid: 'customerA'}, {$set: {cart: req.body.updatedCart}})
				.exec(function (err, results){
			    if (err || results < 1){
			     res.json(404, {msg: 'Failed to update Cart.'});
			    } else {
			     res.json({msg: "Customer Cart Updated"});
			    }
				})
};