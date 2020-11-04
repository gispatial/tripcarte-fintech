"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = require("faker/locale/en");
var utils_1 = require("./utils");
exports.default = (function (db, _a) {
    var serializeDate = _a.serializeDate;
    return Array.from(Array(900).keys()).map(function (id) {
        var first_seen = utils_1.randomDate();
        var last_seen = utils_1.randomDate(first_seen);
        var has_ordered = utils_1.weightedBoolean(25);
        var first_name = en_1.name.firstName();
        var last_name = en_1.name.lastName();
        var email = en_1.internet.email(first_name, last_name);
        var birthday = has_ordered ? en_1.date.past(60) : null;
        return {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: has_ordered ? en_1.address.streetAddress() : null,
            zipcode: has_ordered ? en_1.address.zipCode() : null,
            city: has_ordered ? en_1.address.city() : null,
            stateAbbr: has_ordered ? en_1.address.stateAbbr() : null,
            avatar: en_1.internet.avatar(),
            birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
            first_seen: serializeDate ? first_seen.toISOString() : first_seen,
            last_seen: serializeDate ? last_seen.toISOString() : last_seen,
            has_ordered: has_ordered,
            latest_purchase: null,
            has_newsletter: has_ordered ? utils_1.weightedBoolean(30) : true,
            groups: [],
            nb_commands: 0,
            total_spent: 0,
        };
    });
});
