// create copy object for save function

function CopyObject() {
    this.name = 'copy';
}

// Object shallow copy
CopyObject.prototype.shallowCopy = function (obj) {
    var newObj;
    if (obj instanceof Array) {
        newObj = [];
        for (var i = 0; i < obj.length; i++) {
            newObj.push(obj[i]);
        }
    } else if (typeof obj === 'object') {
        newObj = {};
        for (var key in obj) {
            newObj[key] = obj[key];
        }
    } else {
        return obj;
    }
    return newObj;
}

// Object deep copy 利用递归
CopyObject.prototype.deepCopy = function (obj) {
    var newObj;
    if (typeof obj === 'object') {
        if (obj instanceof Array) {
            newObj = [];
            for (var i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'object') {
                    newObj.push(this.deepCopy(obj[i]));
                } else {
                    newObj.push(obj[i]);
                }
            }
        } else {
            newObj = {};
            for (var key in obj) {
                if (typeof obj[key] === 'object') {
                    newObj[key] = this.deepCopy(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
    } else {
        newObj = obj;
    }

    return newObj;
}

module.exports = CopyObject;

// test
var copy = new CopyObject();

console.log(copy.__proto__);
