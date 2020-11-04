"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (db) {
    var id = 0;
    return (db.commands
        .filter(function (command) { return command.status !== 'delivered'; })
        // @ts-ignore
        .sort(function (a, b) { return new Date(a.date) - new Date(b.date); })
        .map(function (command) { return ({
        id: id++,
        date: command.date,
        command_id: command.id,
        customer_id: command.customer_id,
        total_ex_taxes: command.total_ex_taxes,
        delivery_fees: command.delivery_fees,
        tax_rate: command.tax_rate,
        taxes: command.taxes,
        total: command.total,
    }); }));
});
