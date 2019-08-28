import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

// Drug demand are based on past consumption ( Two Week ) // Consistency : medium
class Drug extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    minChecker(value) {
        if (value < (this.maxCap / 4))
            value = this.maxCap / 4;
        return value;
    }
    TwoweeklyUsageByBox(twoWeekConsumption) {
        var result = (twoWeekConsumption * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(twoWeekConsumption) {
        var result = ((twoWeekConsumption / intervalBetweenOrder) * waitingPeriod * this.rate) / this.quantityPerBox;
        return this.minChecker(result);
    }
    actualOrderQuantity(balance, twoWeekConsumption) {
        var quantity;
        var balanceByBox = balance / this.quantityPerBox;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(twoWeekConsumption);
        this.minCap = this.minLevel(twoWeekConsumption);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox)) {
            return 0;
        }
        if (balanceByBox < this.minCap)
            quantity = this.minCap - balanceByBox + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        if (super.maxChecker(quantity) == 0)
            console.log("zero value");
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balance, twoWeekConsumption) {
        return this.actualOrderQuantity(balance, twoWeekConsumption) * this.price;
    }
}

class Unihepa5k extends Drug { //cvc patient some using unihepa
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
    }
    actualOrderQuantity(balance, twoWeekConsumption) {
        var quantity = super.actualOrderQuantity(balance, twoWeekConsumption);
        if (quantity >= 40)
            alert("Your purchase is more than or equal to 40! Congratulation! 10 vial of " + this.name + " free gift!");
        return quantity;
    }
    totalPrice(balance, twoWeekConsumption) {
        return this.actualOrderQuantity(balance, twoWeekConsumption) * this.price;
    }
}

// Catheter Lock demand are based on citraflow count ( 1 : 1 ) every treatment day // consistency : high
export { Drug, Unihepa5k };