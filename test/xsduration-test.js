var vows = require('vows'),
    assert = require('assert'),
    xsduration = require('..');
var suite = vows.describe('xs:duration implementation');
suite.addBatch({
    'Add simple durations': {
        'Add years': function () {
            var date = new Date();
            var r = xsduration.add('P5Y', date);
            date.setFullYear(date.getFullYear() + 5);
            assert.strictEqual(r.toString(), date.toString());
        },
        'Add months': function () {
            var date = new Date();
            var r = xsduration.add('P12M', date);
            date.setMonth(date.getMonth() + 12);
            assert.strictEqual(r.toString(), date.toString());
        },
        'Add days': function () {
            var date = new Date();
            var r = xsduration.add('P12D', date);
            date.setDate(date.getDate() + 12);
            assert.strictEqual(r.toString(), date.toString());
        },
        'Add hours': function () {
            var date = new Date();
            var r = xsduration.add('PT6H', date);
            date.setHours(date.getHours() + 6);
            assert.strictEqual(r.toString(), date.toString());
        },
        'Add minutes': function () {
            var date = new Date();
            var r = xsduration.add('PT30M', date);
            date.setMinutes(date.getMinutes() + 30);
            assert.strictEqual(r.toString(), date.toString());
	},
	'2000-01-12T12:13:14 + P1Y3M5DT7H10M3.3S = 2001-04-17T19:23:17.3Z': function(){
		var date = new Date(2000,0,12,12,13,14);
		var r = xsduration.add('P1Y3M5DT7H10M3.3S', date);
		var expected = new Date(2001,3,17,19,23,17,3);
            assert.strictEqual(r.toString(), expected.toString());
	},
	'2000-01 + -P3M = 1999-10': function(){
		var date = new Date(2000,0);
		var r = xsduration.add('-P3M', date);
		var expected = new Date(1999,9);
            assert.strictEqual(r.toString(), expected.toString());
	},
	'2000-01-12 + PT33H = 2000-01-13': function(){
		var date = new Date(2000,0, 12);
		var r = xsduration.add('PT33H', date);
		var expected = new Date(2000,0,13);
            assert.strictEqual(r.toDateString(), expected.toDateString());
	}
    }
});
suite.addBatch({
    'Subtract durations across month boundaries': {
        'One day before January 1 is December 31': function () {
            var r = xsduration.add('-P1D', new Date(2024, 0, 1));
            assert.strictEqual(r.getTime(), new Date(2023, 11, 31).getTime());
        },
        'February has 28 days in a common year': function () {
            var r = xsduration.add('-P1D', new Date(2023, 2, 1));
            assert.strictEqual(r.getTime(), new Date(2023, 1, 28).getTime());
        },
        'February has 29 days in a leap year': function () {
            var r = xsduration.add('-P2D', new Date(2024, 2, 1));
            assert.strictEqual(r.getTime(), new Date(2024, 1, 28).getTime());
        },
        'Century years not divisible by 400 are common years': function () {
            var r = xsduration.add('-P1D', new Date(1900, 2, 1));
            assert.strictEqual(r.getTime(), new Date(1900, 1, 28).getTime());
        },
        'Century years divisible by 400 are leap years': function () {
            var r = xsduration.add('-P2D', new Date(2000, 2, 1));
            assert.strictEqual(r.getTime(), new Date(2000, 1, 28).getTime());
        },
        'Subtract days across multiple months and a year boundary': function () {
            var r = xsduration.add('-P60D', new Date(2024, 0, 15));
            assert.strictEqual(r.getTime(), new Date(2023, 10, 16).getTime());
        },
        'Subtract months before borrowing days from the previous year': function () {
            var r = xsduration.add('-P2M20D', new Date(2024, 2, 15));
            assert.strictEqual(r.getTime(), new Date(2023, 11, 26).getTime());
        },
        'Subtract seconds across a year boundary': function () {
            var r = xsduration.add('-PT1S', new Date(2024, 0, 1));
            assert.strictEqual(r.getTime(), new Date(2023, 11, 31, 23, 59, 59).getTime());
        }
    }
});
suite.addBatch({
    'W3C functions': {
        'fQuotient(a,b) = the greatest integer less than or equal to a/b ': function () {
            assert.strictEqual(xsduration.fQuotient(-1, 3), -1);
            assert.strictEqual(xsduration.fQuotient(0, 3), 0);
            assert.strictEqual(xsduration.fQuotient(2, 3), 0);
            assert.strictEqual(xsduration.fQuotient(3, 3), 1);
            assert.strictEqual(xsduration.fQuotient(3.123, 3), 1);
        }
    },
    'modulo(a,b) = a - fQuotient(a,b) * b': function () {
        assert.strictEqual(xsduration.modulo(-1, 3), 2);
        assert.strictEqual(xsduration.modulo(0, 3), 0);
        assert.strictEqual(xsduration.modulo(2, 3), 2);
        assert.strictEqual(xsduration.modulo(3, 3), 0);
        assert.strictEqual(xsduration.modulo(3.123, 3), 0.12300000000000022);
    },
    'fQuotient(a, low, high) =fQuotient(a - low, high - low)': function () {
        assert.strictEqual(xsduration.fQuotient(0, 1, 13), -1);
        assert.strictEqual(xsduration.fQuotient(1, 1, 13), 0);
        assert.strictEqual(xsduration.fQuotient(12, 1, 13), 0);
        assert.strictEqual(xsduration.fQuotient(13, 1, 13), 1);
        assert.strictEqual(xsduration.fQuotient(13.123, 1, 13), 1);
    },
    'modulo(a, low, high) = modulo(a - low, high - low) + low ': function () {
        assert.strictEqual(xsduration.modulo(0, 1, 13), 12);
        assert.strictEqual(xsduration.modulo(1, 1, 13), 1);
        assert.strictEqual(xsduration.modulo(13, 1, 13), 1);
        assert.strictEqual(xsduration.modulo(13.123, 1, 13), 1.1229999999999993);
    }
});
suite.export(module);
