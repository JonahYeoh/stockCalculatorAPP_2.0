import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

// ? the needs to differentiate Single-Use and Re-Use
class Dialyzer extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
    }
}
// Revaclear 300 demand are based on isolation count ( 1 : 1 ) every treatment day // consistency : low due to potential hospitalization
class Single_Use extends Dialyzer {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    TwoweeklyUsageByBox(hepatitisC, postHospitalization, rule = 1) {
        var result = (((hepatitisC * rule) + (postHospitalization * rule)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(hepatitisC, postHospitalization, rule = 1) {
        var base = ((hepatitisC * rule) + (postHospitalization * rule));
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, hepatitisC, postHospitalization) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(hepatitisC, postHospitalization);
        this.minCap = this.minLevel(hepatitisC, postHospitalization);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, hepatitisC, postHospitalization) {
        return this.actualOrderQuantity(balanceByBox, hepatitisC, postHospitalization) * this.price;
    }
}

export { Single_Use };