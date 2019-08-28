import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

class Solution extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
    }
}
// Concentrate demand are based on patient count ( 1 : 0.3 ) every treatement // consistency : high
class Concentrate extends Solution {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = lowRisk;
    }
    TwoweeklyUsageByBox(patientCount, rule = 0.3) { // rule = one concentrate for 3 patients
        var result = (patientCount * rule * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, rule = 0.3) {
        var base = patientCount * rule;
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, rule = 0.3) {
        var quantity = new Array(2);
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, rule);
        this.minCap = this.minLevel(patientCount, rule);
        //console.log(this.name + " minCap = " + this.minCap + " expectedUsage = " + this.expectedUsageByBox);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < (this.minCap / 2))
            quantity[0] = ((this.minCap / 2) - balanceByBox) + (this.expectedUsageByBox / 2);
        else
            quantity[0] = super.maxChecker(this.expectedUsageByBox / 2);
        quantity[1] = super.maxChecker(this.expectedUsageByBox / 2);
        //console.log("quantity[0] = " + quantity[0] + " quantity[1] = " + quantity[1]);
        document.getElementById(this.tag + "_1r").innerHTML = super.maxChecker(quantity[0]);
        document.getElementById(this.tag + "_2r").innerHTML = super.maxChecker(quantity[1]);
        return quantity;
    }
    totalPrice(balanceByBox, patientCount, rule = 0.3) {
        var result = this.actualOrderQuantity(balanceByBox, patientCount, rule);
        var bill = new Array(2);
        bill[0] = result[0] * this.price;
        bill[1] = result[1] * this.price;
        return bill; // bill is an array
    }
}
// Bibag demand are based on patient count ( 1 : 1 ) every treatment // consistency : high
class Bibag extends Concentrate {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = lowRisk;
        }
        /*
        TwoweeklyUsageByBox(patientCount, rule = 1) {
            var result = super.TwoweeklyUsageByBox(patientCount, rule);
            return result;
        }
        minLevel(patientCount, rule = 1) {
            var result = super.minLevel(patientCount, rule);
            return result;
        }
        */
    actualOrderQuantity(balanceByBox, patientCount, rule = 1) {
        var quantity = super.actualOrderQuantity(balanceByBox, patientCount, rule);
        return quantity;
    }
    totalPrice(balanceByBox, patientCount, rule = 1) {
        var result = this.actualOrderQuantity(balanceByBox, patientCount, rule);
        var bill = new Array(2);
        bill[0] = result[0] * this.price;
        bill[1] = result[1] * this.price;
        return bill; // bill is an array
    }
}
// Normal Saline 500 demand are based on patient count ( 1 : 1 ) - isolation ( 1 : 1 ) every treatment // consistency : medium
class NormalSaline500 extends Solution {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    TwoweeklyUsageByBox(patientCount, isolation, rule = 1) {
        var heparinDilution = 1 * intervalBetweenOrder;
        var result = (((patientCount - isolation) * rule * sessionBetweenOrder * this.rate) + heparinDilution) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, isolation, rule = 1) {
        var heparinDilution = 1 * heparinDilution;
        var base = (((patientCount - isolation) * rule * sessionBetweenOrder * this.rate) + heparinDilution) / this.quantityPerBox;
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, isolation) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, isolation);
        this.minCap = this.minLevel(patientCount, isolation);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, isolation) {
        this.actualOrderQuantity(balanceByBox, patientCount, isolation) * this.price;
    }
}
// Normal Saline 1000 demand are based on patient count ( 1 : 1 ) and flushing ( 1 : 1 ) every treatment // consistency : low
class NormalSaline1000 extends Solution {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = highRisk;
    }
    TwoweeklyUsageByBox(patientCount, flushing, rule = 1) {
        var result = ((patientCount * rule) + (flushing * rule) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, flushing, rule = 1) {
        var base = (patientCount * rule) + (flushing * rule);
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, flushing) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, flushing);
        this.minCap = this.minLevel(patientCount, flushing);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, flushing) {
        return this.actualOrderQuantity(balanceByBox, patientCount, flushing) * this.price;
    }
}
// Surgical Spirit demand are based on ???? // consistency : high
// Consumption per 2 week = 5
class SurgicalSpirit extends Solution {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = lowRisk;
    }
    actualOrderQuantity(balanceByBox) {
        var quantity;
        if (balanceByBox <= this.maxCap / 2)
            quantity = this.minOrder * 2;
        else
            quantity = this.minOrder;
        alert("ss70 = " + quantity);
        document.getElementById(this.tag).innerHTML = quantity;
        return quantity;
    }
}

export { Concentrate, Bibag, NormalSaline500, NormalSaline1000, SurgicalSpirit };