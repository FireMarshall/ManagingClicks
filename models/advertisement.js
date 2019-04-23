const mongoose = require('mongoose');

var Advertisement = mongoose.model('Advertisement', {
    company: {
        type: String
    },
    campaign: {
        type: String
    },
    product_name: {
        type: String
    },
    product_href: {
        type: String
    },
    product_img: {
        type: String
    },
    product_category: {
        type: String
    }
});

var Click = mongoose.model('Click', {
    company: {
        type: String
    },
    product_name: {
        type: String
    },
    product_category: {
        type: String
    },
    click_ts: {
        type: Date
    }
});

module.exports = {
    Advertisement,
    Click
};