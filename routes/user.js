var UserModel = require("../models/user");
var CompanyModel = require("../models/company");

var appRouter = function(app) {

    app.get("/api/user/get/:userId", function(req, res) {
        if(!req.params.userId) {
            return res.status(400).send({"status": "error", "message": "A user id is required"});
        }
        UserModel.getById(req.params.userId, function(error, user) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(user);
        });
    });

    app.get("/api/user/getAll", function(req, res) {
        UserModel.find({}, {load: ["company"]}, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    app.post("/api/user/create", function(req, res) {
        console.log(JSON.stringify(req.body));
        var user = new UserModel({
            name: {
                first: req.body.firstname,
                last: req.body.lastname
            },
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                country: req.body.country
            },
            phone: req.body.phone,
            email: req.body.email,
            company: CompanyModel.ref(req.body.company)
        });
        user.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(req.body);
        });
    });

};

module.exports = appRouter;
