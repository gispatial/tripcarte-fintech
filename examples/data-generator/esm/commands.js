import { random } from 'faker/locale/en';
import isAfter from 'date-fns/is_after';
import subDays from 'date-fns/sub_days';
import { randomDate, randomFloat, weightedArrayElement, weightedBoolean, } from './utils';
export default (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = subDays(today, 30);
    return Array.from(Array(600).keys()).map(function (id) {
        var nbProducts = weightedArrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        var basket = Array.from(Array(nbProducts).keys()).map(function () { return ({
            product_id: random.number({ min: 0, max: 10 * 13 - 1 }),
            quantity: weightedArrayElement([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }); });
        var total_ex_taxes = basket.reduce(function (total, product) {
            return total +
                db.products[product.product_id].price * product.quantity;
        }, 0);
        var delivery_fees = randomFloat(3, 8);
        var tax_rate = random.arrayElement([0.12, 0.17, 0.2]);
        var taxes = parseFloat(((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2));
        var customer = random.arrayElement(db.customers.filter(function (customer) { return customer.has_ordered; }));
        var date = randomDate(customer.first_seen, customer.last_seen);
        var status = isAfter(date, aMonthAgo) && random.boolean()
            ? 'ordered'
            : weightedArrayElement(['delivered', 'cancelled'], [10, 1]);
        return {
            id: id,
            reference: random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            basket: basket,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat((total_ex_taxes + delivery_fees + taxes).toFixed(2)),
            status: status,
            returned: status === 'delivered' ? weightedBoolean(10) : false,
        };
    });
});
