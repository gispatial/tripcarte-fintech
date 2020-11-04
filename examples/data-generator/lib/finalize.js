"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function default_1(db) {
    // set latest purchase date
    db.commands.forEach(function (command) {
        var customer = db.customers[command.customer_id];
        if (!customer.latest_purchase ||
            customer.latest_purchase < command.date) {
            customer.latest_purchase = command.date;
        }
        customer.total_spent += command.total;
        customer.nb_commands++;
    });
    // set product sales
    db.commands.forEach(function (command) {
        command.basket.forEach(function (item) {
            db.products[item.product_id].sales += item.quantity;
        });
    });
    // add 'collector' group
    var customersBySpending = db.commands.reduce(function (customers, command) {
        if (!customers[command.customer_id]) {
            customers[command.customer_id] = { nbProducts: 0 };
        }
        customers[command.customer_id].nbProducts += command.basket.length;
        return customers;
    }, {});
    Object.keys(customersBySpending).forEach(function (customer_id) {
        if (customersBySpending[customer_id].nbProducts > 10) {
            db.customers[customer_id].groups.push('collector');
        }
    });
    // add 'ordered_once' group
    db.customers
        .filter(function (customer) { return customer.nb_commands === 1; })
        .forEach(function (customer) { return customer.groups.push('ordered_once'); });
    // add 'compulsive' group
    db.customers
        .filter(function (customer) { return customer.total_spent > 1500; })
        .forEach(function (customer) { return customer.groups.push('compulsive'); });
    // add 'regular' group
    db.customers
        .filter(function () { return utils_1.weightedBoolean(20); })
        .forEach(function (customer) { return customer.groups.push('regular'); });
    // add 'returns' group
    db.commands
        .filter(function (command) { return command.returned; })
        .forEach(function (command) {
        if (db.customers[command.customer_id].groups.indexOf('returns') ===
            -1) {
            db.customers[command.customer_id].groups.push('returns');
        }
    });
    // add 'reviewer' group
    db.reviews.forEach(function (review) {
        var customer = db.customers[review.customer_id];
        if (customer.groups.indexOf('reviewer') === -1) {
            customer.groups.push('reviewer');
        }
    });
    // add settings
    db.settings = [
        {
            id: 1,
            configuration: {
                url: 'http://posters-galore.com/',
                mail: {
                    sender: 'julio@posters-galore.com',
                    transport: {
                        service: 'fakemail',
                        auth: {
                            user: 'fake@mail.com',
                            pass: 'f00b@r',
                        },
                    },
                },
                file_type_whiltelist: [
                    'txt',
                    'doc',
                    'docx',
                    'xls',
                    'xlsx',
                    'pdf',
                    'png',
                    'jpg',
                ],
            },
        },
    ];
}
exports.default = default_1;
