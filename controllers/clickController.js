const express = require('express');
var router = express.Router();
var {
    Advertisement,
    Click
} = require('../models/advertisement');

//admin
router.get('/', (req, res) => {
    Advertisement.find((err, docs) => {
        if (!err) {
            res.send(docs);
            console.log(docs);
        } else {
            console.log('Error in Retriving Advertisements :' + JSON.stringify(err, undefined, 2));
            res.send('Error in Retriving Advertisements :' + JSON.stringify(err, undefined, 2));
        }
    });
});

//admin
router.post('/', (req, res) => {
    let adv = new Advertisement({
        company: req.body.company,
        campaign: req.body.campaign,
        product_name: req.body.product_name,
        product_href: req.body.product_link,
        product_img: req.body.product_img_link,
        product_category: req.body.product_category,
    })
    adv.save(err => {
        if (!err) {
            res.send("Added successfully");
            console.log("Success");
        } else {
            console.log("Error: " + err);
            res.send(err);
        }
    });
});

// aggregrate by product name
router.get('/admin/group_by_name', (req, res) => {
    Click.aggregate([{
        $group: {
            _id: "$product_name",
            count: {
                $sum: 1
            }
        }
    }], (err, docs) => {
        if (!err) {
            res.send(docs);
            console.table(docs);
        } else {
            console.log('Error in retrieving Stats: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// aggregate by product_company
router.get('/admin/group_by_company', (req, res) => {
    Click.aggregate([{
        $group: {
            _id: "$company",
            count: {
                $sum: 1
            }
        }
    }], (err, docs) => {
        if (!err) {
            res.send(docs);
            console.table(docs);
        } else {
            console.log('Error in retrieving Stats: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// aggregate by product_category
router.get('/admin/group_by_category', (req, res) => {
    Click.aggregate([{
        $group: {
            _id: "$product_category",
            count: {
                $sum: 1
            }
        }
    }], (err, docs) => {
        if (!err) {
            res.send(docs);
            console.table(docs);
        } else {
            console.log('Error in retrieving Stats: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// register click
router.post('/click', (req, res) => {
    let click_record = new Click({
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        company: req.body.company,
        click_ts: req.body.click_ts
    })
    console.log("Recieved Click : ", JSON.stringify(click_record));
    click_record.save(err => {
        if (!err) {
            console.log("saved");
            res.send({
                Status: "Success"
            });
        } else {
            console.log(err);
            res.send({
                Status: "Error"
            });
        }
        res.end();
    });
});





module.exports = router;