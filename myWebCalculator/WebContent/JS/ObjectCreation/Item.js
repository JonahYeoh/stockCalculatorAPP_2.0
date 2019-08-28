class Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        this.name = name;
        this.maxCap = maxCap; // by box
        this.quantityPerBox = quantityPerBox;
        this.minOrder = amount;
        this.price = price;
        this.tag = code;
        this.expectedUsageByBox = 0;
        this.minCap = 0;
    }
    TwoweeklyUsageByBox() {}
    minLevel() {}
    actualOrderQuantity() {}
    minChecker(value) {
        if (value < (this.maxCap / 3))
            value = this.maxCap / 3;
        return Math.ceil(value);
    }
    maxLevel() {
        var result = this.quantityPerBox * this.maxCap;
        return result;
    }
    maxChecker(quantity) {
        if (quantity - 1 == this.maxCap)
            quantity = this.maxCap;
        else if (quantity > this.maxCap)
            alert("Query invalid demand or balance is entered for " + this.name + ". Please ignore this message if you desire quantity higher than maximum capacity. ");
        return Math.ceil(quantity);
    }
    thirdByBox() {
        var halfValue = this.maxCap / 3;
        return Math.ceil(halfValue);
    }
}

var treatmentSessionPerWeek = 3;
var intervalBetweenOrder = 12; // 2 weeks = 12 operating days = 6 treatment sesssions per patient
var sessionBetweenOrder = 6;
var waitingPeriod = 10;
var sessionBetweenWaiting = 5;
var stockShouldLast = 14; //
var highRisk = 1.1;
var mediumRisk = 1.08;
var lowRisk = 1.05;

export { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk };