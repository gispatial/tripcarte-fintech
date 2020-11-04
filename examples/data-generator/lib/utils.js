"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFloat = exports.randomDate = exports.weightedBoolean = exports.weightedArrayElement = void 0;
var en_1 = __importDefault(require("faker/locale/en"));
exports.weightedArrayElement = function (values, weights) {
    return en_1.default.random.arrayElement(values.reduce(function (acc, value, index) {
        return acc.concat(new Array(weights[index]).fill(value));
    }, []));
};
exports.weightedBoolean = function (likelyhood) {
    return en_1.default.random.number(99) < likelyhood;
};
exports.randomDate = function (minDate, maxDate) {
    var minTs = minDate instanceof Date
        ? minDate.getTime()
        : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
    var maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
    var range = maxTs - minTs;
    var randomRange = en_1.default.random.number({ max: range });
    // move it more towards today to account for traffic increase
    var ts = Math.sqrt(randomRange / range) * range;
    return new Date(minTs + ts);
};
exports.randomFloat = function (min, max) {
    return parseFloat(en_1.default.random.number({ min: min, max: max, precision: 0.01 }).toFixed(2));
};
