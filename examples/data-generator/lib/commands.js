"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = require("faker/locale/en");
var is_after_1 = __importDefault(require("date-fns/is_after"));
var sub_days_1 = __importDefault(require("date-fns/sub_days"));
var utils_1 = require("./utils");
exports.default = (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = sub_days_1.default(today, 30);
    return Array.from(Array(600).keys()).map(function (id) {
        var nbProducts = utils_1.weightedArrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        var basket = Array.from(Array(nbProducts).keys()).map(function () { return ({
            product_id: en_1.random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: utils_1.weightedArrayElement([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }); });
        var total_ex_taxes = basket.reduce(function (total, product) {
            return total +
                db.products[product.product_id].price * product.quantity;
        }, 0);
        var delivery_fees = utils_1.randomFloat(3, 8);
        var tax_rate = en_1.random.arrayElement([0.12, 0.17, 0.2]);
        var taxes = parseFloat(((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2));
        var customer = en_1.random.arrayElement(db.customers.filter(function (customer) { return customer.has_ordered; }));
        var date = utils_1.randomDate(customer.first_seen, customer.last_seen);
        var status = is_after_1.default(date, aMonthAgo) && en_1.random.boolean()
            ? 'ordered'
            : utils_1.weightedArrayElement(['delivered', 'cancelled'], [10, 1]);
        return {
            id: id,
            reference: en_1.random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            basket: basket,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat((total_ex_taxes + delivery_fees + taxes).toFixed(2)),
            status: status,
            returned: status === 'delivered' ? utils_1.weightedBoolean(10) : false,
        };
    });
});
