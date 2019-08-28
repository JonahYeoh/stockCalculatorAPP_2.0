import { Item, treatmentSessionPerWeek, intervalBetweenOrder, sessionBetweenOrder, waitingPeriod, sessionBetweenWaiting, stockShouldLast, highRisk, mediumRisk, lowRisk } from "/JS/ObjectCreation/Item.js";

class Syringe extends Item {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
    }
}
// 3cc syringe demand are based on cvc count ( 1 : 3 ) and bonky ( consumption / volume / 12 ) every treatment // consistency : medium
class ThreeCCSyringe extends Syringe {
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    TwoweeklyUsageByBox(cvc, bonky, rule1 = 4, rule2 = 1) {
        var bonkySyringe = bonky / intervalBetweenOrder;
        var result = (((cvc * rule1) + (bonkySyringe * rule2)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(cvc, bonky, rule1 = 4, rule2 = 1) {
        var bonkySyringe = bonky / intervalBetweenOrder;
        var base = (cvc * rule1) + (bonkySyringe * rule2);
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, cvc, bonky) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(cvc, bonky);
        this.minCap = this.minLevel(cvc, bonky);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, cvc, bonky) {
        return this.actualOrderQuantity(balanceByBox, cvc, bonky) * this.price;
    }
}
// 10cc syringe demand are based on patient count ( 1 : 1 ) and venofer ( consumption / volume / 12 ) every treatemnt // consistency : medium
class TenCCSyringe extends Syringe { //CVC patient ( 1 :2 )
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    TwoweeklyUsageByBox(patientCount, avofer, cvc, rule1 = 1, rule2 = 1, rule3 = 2) {
        var avoferSyringe = avofer / intervalBetweenOrder;
        var result = ((((patientCount * rule1) - (cvc * 1)) + ((avoferSyringe * rule2) + (cvc * rule3))) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, avofer, cvc, rule1 = 1, rule2 = 1, rule3 = 2) {
        var avoferSyringe = avofer / intervalBetweenOrder;
        var base = (((((patientCount * rule1) - (cvc * 1)) + ((avoferSyringe * rule2) + (cvc * rule3))) * this.rate) / this.quantityPerBox);
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, avofer, cvc) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, avofer, cvc);
        this.minCap = this.minLevel(patientCount, avofer, cvc); //
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, avofer, cvc) {
        return this.actualOrderQuantity(balanceByBox, patientCount, avofer, cvc) * this.price;
    }
}

// 20 cc syringe demand are based on patient count ( 1 : 2 ) - cvc count ( 1 : 1 ) - heparin free ( 1 : 1 ) every day// consistency : medium 
class TwentyCCSyringe extends Syringe { //CVC patient ( 1 :2 )
    constructor(name, maxCap, quantityPerBox, amount, price, code) {
        super(name, maxCap, quantityPerBox, amount, price, code);
        this.rate = mediumRisk;
    }
    TwoweeklyUsageByBox(patientCount, cvc, heparin, rule1 = 2, rule2 = 1, rule3 = 3) {
        var result = (((patientCount * rule1) - ((cvc * rule2) + (heparin * rule2)) + (cvc * rule3)) * sessionBetweenOrder * this.rate) / this.quantityPerBox;
        return result;
    }
    minLevel(patientCount, cvc, heparin, rule1 = 2, rule2 = 1, rule3 = 3) {
        var base = ((patientCount * rule1) - ((cvc * rule2) + (heparin * rule2)) + (cvc * rule3));
        var result = (base * sessionBetweenWaiting * this.rate) / this.quantityPerBox;
        return super.minChecker(result);
    }
    actualOrderQuantity(balanceByBox, patientCount, cvc, heparin) {
        var quantity;
        this.expectedUsageByBox = this.TwoweeklyUsageByBox(patientCount, cvc, heparin);
        this.minCap = this.minLevel(patientCount, cvc, heparin);
        if (balanceByBox >= (this.minCap + this.expectedUsageByBox))
            return 0;
        if (balanceByBox < this.minCap)
            quantity = (this.minCap - balanceByBox) + this.expectedUsageByBox;
        else
            quantity = this.expectedUsageByBox;
        document.getElementById(this.tag).innerHTML = super.maxChecker(quantity);
        return super.maxChecker(quantity);
    }
    totalPrice(balanceByBox, patientCount, cvc, heparin) {
        return this.actualOrderQuantity(balanceByBox, patientCount, cvc, heparin) * this.price;
    }
}

export { ThreeCCSyringe, TenCCSyringe, TwentyCCSyringe };