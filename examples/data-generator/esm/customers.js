import { date, name, internet, address } from 'faker/locale/en';
import { randomDate, weightedBoolean } from './utils';
export default (function (db, _a) {
    var serializeDate = _a.serializeDate;
    return Array.from(Array(900).keys()).map(function (id) {
        var first_seen = randomDate();
        var last_seen = randomDate(first_seen);
        var has_ordered = weightedBoolean(25);
        var first_name = name.firstName();
        var last_name = name.lastName();
        var email = internet.email(first_name, last_name);
        var birthday = has_ordered ? date.past(60) : null;
        return {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            address: has_ordered ? address.streetAddress() : null,
            zipcode: has_ordered ? address.zipCode() : null,
            city: has_ordered ? address.city() : null,
            stateAbbr: has_ordered ? address.stateAbbr() : null,
            avatar: internet.avatar(),
            birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
            first_seen: serializeDate ? first_seen.toISOString() : first_seen,
            last_seen: serializeDate ? last_seen.toISOString() : last_seen,
            has_ordered: has_ordered,
            latest_purchase: null,
            has_newsletter: has_ordered ? weightedBoolean(30) : true,
            groups: [],
            nb_commands: 0,
            total_spent: 0,
        };
    });
});
