var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { random, lorem } from 'faker/locale/en';
import subDays from 'date-fns/sub_days';
import isAfter from 'date-fns/is_after';
import { randomDate, weightedArrayElement, weightedBoolean } from './utils';
export default (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = subDays(today, 30);
    var id = 0;
    var reviewers = db.customers
        .filter(function (customer) { return customer.has_ordered; })
        .filter(function () { return weightedBoolean(60); }) // only 60% of buyers write reviews
        .map(function (customer) { return customer.id; });
    return db.commands
        .filter(function (command) { return reviewers.indexOf(command.customer_id) !== -1; })
        .reduce(function (acc, command) { return __spreadArrays(acc, command.basket
        .filter(function () { return weightedBoolean(40); }) // reviewers review 40% of their products
        .map(function (product) {
        var date = randomDate(command.date);
        var status = isAfter(aMonthAgo, date)
            ? weightedArrayElement(['accepted', 'rejected'], [3, 1])
            : weightedArrayElement(['pending', 'accepted', 'rejected'], [5, 3, 1]);
        return {
            id: id++,
            date: serializeDate ? date.toISOString() : date,
            status: status,
            command_id: command.id,
            product_id: product.product_id,
            customer_id: command.customer_id,
            rating: random.number({ min: 1, max: 5 }),
            comment: Array.apply(null, Array(random.number({ min: 1, max: 5 })))
                .map(function () { return lorem.sentences(); })
                .join('\n \r'),
        };
    })); }, []);
});
