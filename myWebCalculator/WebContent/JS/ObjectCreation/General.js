import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

// Surgical Mask demand are based on past consumption ( Two Week ) // consistency : high
class SurgicalMask extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = lowRisk;
        this.minCap = 0;
        this.expectedUsageByBox = 0;
    }
    TwoweeklyUsageByBox(twoWeekConsumption) {
        var result = (twoWeekConsumption * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(twoWeekConsumption) {
        var result = ((twoWeekConsumption / intervalBetweenOrder) * waitingPeriod * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, twoWeekConsumption) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(twoWeekConsumption);
        this.minCap = this.minLevel(twoWeekConsumption);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, twoWeekConsumption) {
        return this.actualOrderQuantity(balanceByBox, twoWeekConsumption) * this.price;
    }
}
// Combi Red demand are based on patient count ( 1 : 1 ) // consistency : high
class CombiRed extends Item { // CVC patient also using as stopper ( 1 : 2 )
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.minCap = 0;
        this.rate = lowRisk;
        this.expectedUsageByBox = 0;
    }
    TwoweeklyUsageByBox(patientCount, cvc, rule1 = 1, rule2 = 2) {
        var result = (((patientCount * rule1) + (cvc * rule2)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, cvc, rule1 = 1, rule2 = 2) {
        var base = (patientCount * rule1) + (cvc * rule2);
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, cvc) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, cvc);
        this.minCap = this.minLevel(patientCount, cvc);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, cvc) {
        return this.actualOrderQuantity(balanceByBox, patientCount, cvc) * this.price;
    }
}
// Hand Towel demand are based on patient count ( 50 : 8 ) every day // consistency : low
class HandTowel extends Item { // 200 pcs/pack , 1 patient to 8 pcs 
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.minCap = 0;
        this.rate = highRisk;
        this.expectedUsageByBox = 0;
    }
    TwoweeklyUsageByBox(patientCount, rule = 0.04) {
        var result = (patientCount * rule * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, rule = 0.04) {
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
class General extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.minCap = 0;
        this.expectedUsageByBox = 0;
    }
    TwoweeklyUsageByBox(value1, value2, rule1 = 1, rule2 = 1) {
        var result = (((value1 * rule1) + (value2 * rule2)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(value1, value2, rule1 = 1, rule2 = 1) {
        var base = (value1 * rule1) + (value2 * rule2);
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, value1, value2, rule1 = 1, rule2 = 1) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(value1, value2, rule1, rule2);
        this.minCap = this.minLevel(value1, value2, rule1, rule2);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, value1, value2, rule1 = 1, rule2 = 1) {
        return this.actualOrderQuantity(balanceByBox, value1, value2, rule1 = 1, rule2 = 1) * this.price;
    }
}
// Bloodline demand are based on patient count ( 1 : 1 ) and flushing ( 1 : 0.05 ) every treatment // consistency : high
class Bloodline extends General { // 100 patients maybe 5 patients system clot
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = lowRisk;
        }
        /*
        TwoweeklyUsageByBox(patientCount, flushing, rule1 = 1, rule2 = 0.05) {
            var result = super.TwoweeklyUsageByBox(patientCount, flushing, rule1, rule2);
            return result;
        }
        minLevel(patientCount, flushing, rule1 = 1, rule2 = 0.05) {
            var result = super.minLevel(patientCount, flushing, rule1, rule2);
            return result;
        }
        */

    TwoweeklyUsageByBox(patientCount, flushing, rule1 = 1, rule2 = 0.05) { // rule = one concentrate for 3 patients
        var result = (((patientCount * rule1) + (flushing * rule2)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, flushing, rule1 = 1, rule2 = 0.05) {
        var base = ((patientCount * rule1) + (flushing * rule2));
        var result = (base * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, flushing, rule1, rule2) {
        var quantity = new Array(2);
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, flushing, rule1, rule2);
        this.minCap = this.minLevel(patientCount, flushing, rule1, rule2);

        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity[0] = super.maxChecker((this.minCap - balanceByBox) + this.expectedUsageByBox / 2);
        else
            quantity[0] = super.maxChecker(this.expectedUsageByBox / 2);
        quantity[1] = super.maxChecker(this.expectedUsageByBox / 2);

        document.getElementById(this.tag + "_1r").innerHTML = (quantity[0]);
        document.getElementById(this.tag + "_2r").innerHTML = (quantity[1]);
        return quantity;
    }
    totalPrice(balanceByBox, patientCount, flushing, rule1 = 1, rule2 = 0.05) {
        var result = this.actualOrderQuantity(balanceByBox, patientCount, flushing, rule1, rule2);
        var bill = new Array(2);
        bill[0] = result[0] * this.price;
        bill[1] = result[1] * this.price;
        return bill; // bill is an array
    }
}
// Dressing Set demand are based on patient who required dressing ( 1 : 1 ) and cvc count ( 1 : 2 ) every treatment // consistency : high
class Dressing extends General {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = lowRisk;
        }
        /*
        TwoweeklyUsageByBox(dressing, cvc, rule1 = 1, rule2 = 2) {
            var result = super.TwoweeklyUsageByBox(patientCount, cvc, rule1, rule2);
            return result;
        }
        minLevel(patientCount, cvc, rule1 = 1, rule2 = 2) {
            var result = super.minLevel(dressing, cvc, rule1, rule2);
            return result;
        }
        */
    actualOrderQuantity(balanceByBox, dressing, cvc, rule1 = 1, rule2 = 2) {
        var quantity = super.actualOrderQuantity(balanceByBox, dressing, cvc, rule1, rule2);
        document.getElementById(this.tag).innerHTML = quantity;
        return quantity;
    }
    totalPrice(balanceByBox, dressing, cvc, rule1 = 1, rule2 = 2) {
        return (this.actualOrderQuantity(balanceByBox, dressing, cvc, rule1, rule2) * this.price);
    }
}

export { SurgicalMask, CombiRed, HandTowel, Bloodline, Dressing };