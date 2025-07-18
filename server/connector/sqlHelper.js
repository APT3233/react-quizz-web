'use strict';

function addslashes(string) {
    return string
        .replace(/\\/g, '\\\\')
        .replace(/\u0008/g, '\\b')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\f/g, '\\f')
        .replace(/\r/g, '\\r')
        .replace(/'/g, '\\\'')
        .replace(/"/g, '\\"');
};

function JSONStringifyToSQL(obj) {
    return addslashes(JSON.stringify(obj))
};

export default {
    addslashes,
    JSONStringifyToSQL
};
