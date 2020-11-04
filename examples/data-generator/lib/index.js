"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customers_1 = __importDefault(require("./customers"));
var categories_1 = __importDefault(require("./categories"));
var products_1 = __importDefault(require("./products"));
var commands_1 = __importDefault(require("./commands"));
var invoices_1 = __importDefault(require("./invoices"));
var reviews_1 = __importDefault(require("./reviews"));
var finalize_1 = __importDefault(require("./finalize"));
exports.default = (function (options) {
    if (options === void 0) { options = { serializeDate: true }; }
    var db = {};
    db.customers = customers_1.default(db, options);
    db.categories = categories_1.default();
    db.products = products_1.default(db);
    db.commands = commands_1.default(db, options);
    db.invoices = invoices_1.default(db);
    db.reviews = reviews_1.default(db, options);
    finalize_1.default(db);
    return db;
});
