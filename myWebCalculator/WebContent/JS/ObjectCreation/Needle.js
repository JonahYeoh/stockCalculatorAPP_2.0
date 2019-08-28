import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

// avf 15G demand are based on 15G count ( 1 : 2 ) every treatment // consistency : high
// avf 16G demand are based on 16G count ( 1 : 2 ) every treatment // consistency : high
// avf 17F demand are based on 17G count ( 1 : 2 ) every treatment // consistency : high
class Needle extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = lowRisk;
    }
    TwoweeklyUsageByBox(patientCount, rule = 2) {
        var result = (patientCount * rule * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, rule = 2) {
        var base = patientCount * rule;
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount);
        this.minCap = this.minLevel(patientCount);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount) {
        return this.actualOrderQuantity(balanceByBox, patientCount) * this.price;
    }
}

export { Needle };