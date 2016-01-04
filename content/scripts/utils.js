'use strict';

function isEmpty(ob) {
    for (var i in ob) {
        return false;
    }
    return true;
}
