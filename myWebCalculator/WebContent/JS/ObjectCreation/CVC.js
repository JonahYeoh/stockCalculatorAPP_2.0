import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

class CVC extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
    }
    TwoweeklyUsageByBox(cvc, rule = 1) {
        var result = (cvc * rule * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(cvc, rule = 1) {
        var base = cvc * rule;
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, cvc, rule = 1) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(cvc, rule);
        this.minCap = this.minLevel(cvc, rule);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, cvc, rule = 1) {
        return this.actualOrderQuantity(balanceByBox, cvc, rule) * this.price;
    }
}
// Gauze demand are based on patient count ( 1 : 2 ) and cvc count ( 1 : 5 ) every treatment day // consistency : low due to potential bleeding
class Gauze extends CVC {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = highRisk;
    }
    TwoweeklyUsageByBox(patientCount, cvc, rule1 = 2, rule2 = 5, looseQuantity = 5) {
        var result = ((((patientCount * rule1) - (cvc * rule1) + (cvc * rule2)) * sessionBetweenOrder * this.rate) / looseQuantity) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, cvc, rule1 = 2, rule2 = 5, looseQuantity = 5) {
        var base = (patientCount * rule1) - (cvc * rule1) + (cvc * rule2);
        var result = ((base * sessionBetweenWaiting * this.rate) / looseQuantity) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, cvc, rule1 = 2, rule2 = 5, looseQuantity = 5) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, cvc, rule1, rule2, looseQuantity);
        this.minCap = this.minLevel(patientCount, cvc, rule1, rule2, looseQuantity);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, cvc, rule1 = 2, rule2 = 5, looseQuantity = 5) {
        return this.actualOrderQuantity(balanceByBox, patientCount, cvc, rule1, rule2, looseQuantity) * this.price;
    }

}
// Cotton demand are based on patient count ( 1 : 2 ) and cvc count ( 1 : 0 ) every treatment day // consistency : medium
class Cotton extends Gauze { // CVC patient not using cotton
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = mediumRisk;
        }
        /*
        TwoweeklyUsageByBox(patientCount, cvc, rule1 = 2, rule2 = 5) {
            var result = super.TwoweeklyUsageByBox(patientCount, cvc, rule1, rule2);
            return result;
        }
        minLevel(patientCount, cvc, rule1 = 2, rule2 = 5) {
            var result = super.minLevel(patientCount, cvc, rule1, rule2);
            return result;
        }
        */
    actualOrderQuantity(balanceByBox, patientCount, cvc, rule1 = 2, rule2 = 0, looseQuantity = 10) {
        var quantity = super.actualOrderQuantity(balanceByBox, patientCount, cvc, rule1, rule2, looseQuantity);
        document.getElementById(this.tag).innerHTML = quantity;
        return quantity;
    }
    totalPrice(balanceByBox, patientCount, cvc) {
        return this.actualOrderQuantity(balanceByBox, patientCount, cvc) * this.price;
    }
}

// Catheter Lock demand are based on cvc count ( 1 : 1 ) every treatment day // consistency : high
class CatheterLock extends CVC { // some patient using Unihepa // not handled at the moment
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = lowRisk;
        }
        /*
        TwoweeklyUsageByBox(cvc, rule = 1) {
            var result = super.TwoweeklyUsageByBox(cvc, rule);
            return result;
        }
        minLevel(cvc, rule = 1) {
            var result = super.minLevel(cvc, rule);
            return result;
        }
        */
    actualOrderQuantity(balanceByBox, citraFlow, rule = 1) {
        var quantity = super.actualOrderQuantity(balanceByBox, citraFlow, rule);
        document.getElementById(this.tag).innerHTML = quantity;
        return quantity;
    }
    totalPrice(balanceByBox, cvc) {
        return this.actualOrderQuantity(balanceByBox, cvc) * this.price;
    }
}

// Chlohexidine demand are based on cvc count ( 1 : 1 ) every treatment day // consistency : high
class Chlohexidine extends CVC {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
            super(name, maxCap, quantityPerBox, amount, price, code);
            this.rate = lowRisk;
        }
        /*
        TwoweeklyUsageByBox(cvc, rule = 1) {
            var result = super.TwoweeklyUsageByBox(cvc, rule);
            return result;
        }
        minLevel(cvc, rule = 1) {
            var result = super.minLevel(cvc, rule);
            return result;
        }
        */
    actualOrderQuantity(balanceByBox, cvc, rule = 1) {
        var quantity = super.actualOrderQuantity(balanceByBox, cvc, rule);
        document.getElementById(this.tag).innerHTML = quantity;
        return quantity;
    }
    totalPrice(balanceByBox, cvc) {
        return this.actualOrderQuantity(balanceByBox, cvc) * this.price;
    }
}

export { Gauze, Cotton, CatheterLock, Chlohexidine };