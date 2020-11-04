"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = require("faker/locale/en");
var sub_days_1 = __importDefault(require("date-fns/sub_days"));
var is_after_1 = __importDefault(require("date-fns/is_after"));
var utils_1 = require("./utils");
exports.default = (function (db, _a) {
    var serializeDate = _a.serializeDate;
    var today = new Date();
    var aMonthAgo = sub_days_1.default(today, 30);
    var id = 0;
    var reviewers = db.customers
        .filter(function (customer) { return customer.has_ordered; })
        .filter(function () { return utils_1.weightedBoolean(60); }) // only 60% of buyers write reviews
        .map(function (customer) { return customer.id; });
    return db.commands
        .filter(function (command) { return reviewers.indexOf(command.customer_id) !== -1; })
        .reduce(function (acc, command) { return __spreadArrays(acc, command.basket
        .filter(function () { return utils_1.weightedBoolean(40); }) // reviewers review 40% of their products
        .map(function (product) {
        var date = utils_1.randomDate(command.date);
        var status = is_after_1.default(aMonthAgo, date)
            ? utils_1.weightedArrayElement(['accepted', 'rejected'], [3, 1])
            : utils_1.weightedArrayElement(['pending', 'accepted', 'rejected'], [5, 3, 1]);
        return {
            id: id++,
            date: serializeDate ? date.toISOString() : date,
            status: status,
            command_id: command.id,
            product_id: product.product_id,
            customer_id: command.customer_id,
            rating: en_1.random.number({ min: 1, max: 5 }),
            comment: Array.apply(null, Array(en_1.random.number({ min: 1, max: 5 })))
                .map(function () { return en_1.lorem.sentences(); })
                .join('\n \r'),
        };
    })); }, []);
});
