/**
 * http://usejsdoc.org/
 */
// style="height:8px;border-bottom:none;border: 1px solid black;"
var background = { "background-color": "#C1D786" };
var rowStyle = { "height": "8px", "border-bottom": "none", "border": "1px solid black" };
var cellStyle = { "border-bottom": "none", "border": "1px solid black" };
var AlertMessage = new Array('Amount over max capacity:');

function updateError() {
    var str = "";
    for (i = 0; i < AlertMessage.length; i++) {
        // if i has reached the final index, print period
        if (i == AlertMessage.length - 1)
            str += AlertMessage[i] + ".";
        else if (i == 0) // else if i is index zero, print space
            str += AlertMessage[i] + " ";
        else // else i is between head and tail of array, print corma to separate content
            str += AlertMessage[i] + ", ";
    }
    document.getElementById("error").innerHTML = str;
}



var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.departments = ['PGDC/L4', 'PGDC/L5'];
    $scope.sessionBetweenWaiting = 2;
    $scope.sessionBetweenOrder = 3;
    $scope.lowRisk = 1.02;
    $scope.mediumRisk = 1.05;
    $scope.highRisk = 1.08;

    $scope.style = function() {
        return background;
    };
    $scope.tr = function() {
        return rowStyle;
    };
    $scope.td = function() {
        return cellStyle;
    }
    $scope.status = false;
    $scope.score = 9;
    $scope.checkStatus = function() {
        return $scope.status;
    };
    $scope.finalCheck = function(BalanceByBox, minL, twoWeek, obj) {
        var quantity;
        if (BalanceByBox >= minL + twoWeek) {
            quantity = 0;
            return quantity;
        } else if (BalanceByBox < minL)
            quantity = minL - BalanceByBox + twoWeek;
        else
            quantity = twoWeek;
        if (quantity > obj.maxCap) {
            i = 0;
            state = true;
            while (i < AlertMessage.length) {
                if (obj.name == AlertMessage[i]) {
                    state = false;
                    break;
                } else
                    i++;
            }
            if (state == true)
                AlertMessage.push(obj.name);
        } else if (quantity < obj.maxCap / 3)
            quantity = obj.maxCap / 3;
        return Math.ceil(quantity);
    };
    $scope.Drug = function(Balance, Consumption, Rate, obj) {
        var twoWeek = (Consumption * Rate) / obj.qtt;
        var minL = ((Consumption / 12) * Rate * 10) / obj.qtt;
        var BalanceByBox = Balance / obj.qtt;
        var quantity = $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
        return quantity;
    };
    $scope.SurgicalMask = function(BalanceByBox, Consumption, Rate, obj) {
        var twoWeek = (Consumption * Rate) / obj.qtt;
        var minL = ((Consumption / 12) * Rate * 10) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Concentrate_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var oneWeek = (PatientCount * obj.rule[0].dialysate * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].dialysate * $scope.sessionBetweenWaiting * Rate) / obj.qtt;

        if (BalanceByBox >= (minL / 2) + oneWeek) {
            quantity = 0;
            return quantity;
        } else if (BalanceByBox < minL / 2)
            quantity = (minL / 2) - BalanceByBox + oneWeek;
        else
            quantity = oneWeek;
        if (quantity > obj.maxCap) {
            i = 0;
            state = true;
            while (i < AlertMessage.length) {
                if (obj.name == AlertMessage[i]) {
                    state = false;
                    break;
                } else
                    i++;
            }
            if (state == true)
                AlertMessage.push(obj.name);
        }
        return Math.ceil(quantity);
    };
    $scope.Concentrate_W2 = function(PatientCount, Rate, obj) {
        var quantity = (PatientCount * obj.rule[0].dialysate * 3 * Rate) / obj.qtt;
        return Math.ceil(quantity);
    };
    $scope.BiBag_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var oneWeek = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].patient * $scope.sessionBetweenWaiting * Rate) / obj.qtt;

        if (BalanceByBox >= (minL / 2) + oneWeek) {
            quantity = 0;
            return quantity;
        } else if (BalanceByBox < minL / 2)
            quantity = (minL / 2) - BalanceByBox + oneWeek;
        else
            quantity = oneWeek;
        if (quantity > obj.maxCap) {
            i = 0;
            state = true;
            while (i < AlertMessage.length) {
                if (obj.name == AlertMessage[i]) {
                    state = false;
                    break;
                } else
                    i++;
            }
            if (state == true)
                AlertMessage.push(obj.name);
        }
        return Math.ceil(quantity);
    };
    $scope.BiBag_W2 = function(PatientCount, Rate, obj) {
        var quantity = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        return Math.ceil(quantity);
    };
    $scope.Bloodline_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var oneWeek = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].patient * $scope.sessionBetweenWaiting * Rate) / obj.qtt;

        if (BalanceByBox >= (minL / 2) + oneWeek) {
            quantity = 0;
            return quantity;
        } else if (BalanceByBox < minL / 2)
            quantity = (minL / 2) - BalanceByBox + oneWeek;
        else
            quantity = oneWeek;
        if (quantity > obj.maxCap) {
            i = 0;
            state = true;
            while (i < AlertMessage.length) {
                if (obj.name == AlertMessage[i]) {
                    state = false;
                    break;
                } else
                    i++;
            }
            if (state == true)
                AlertMessage.push(obj.name);
        }
        return Math.ceil(quantity);
    };
    $scope.Bloodline_W2 = function(PatientCount, Rate, obj) {
        var quantity = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        return Math.ceil(quantity);
    };
    $scope.Needle = function(BalanceByBox, PatientCount, Rate, obj) {
        var twoWeek = (PatientCount * obj.rules[0].rule * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rules[0].rule * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    // Below are sharing same pattern
    // Normal Saline 500 demand are based on patient count ( 1 : 1 ) - isolation ( 1 : 1 ) every treatment // consistency : medium
    // Normal Saline 1000 demand are based on patient count ( 1 : 1 ) and flushing ( 1 : 1 ) every treatment // consistency : low
    $scope.NormalSaline500 = function(BalanceByBox, Variable1, Variable2, Rate, obj) {
        var twoWeek = (((Variable1 * obj.rules[0].rule) - (Variable2 * obj.rules[0].rule)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rules[0].rule) - (Variable2 * obj.rules[0].rule)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.NormalSaline1000 = function(BalanceByBox, Variable1, Variable2, Rate, obj) {
        var twoWeek = ((Variable1 + Variable2) * obj.rules[0].rule * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = ((Variable1 + Variable2) * obj.rules[0].rule * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.SingleUse = function(BalanceByBox, Variable1, Variable2, Rate, obj) { // ?? Hepatits Patient is not included in Isolation Patient
        var twoWeek = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Stopper = function(BalanceByBox, Variable1, Variable2, Rate, obj) {
        var twoWeek = (((Variable1 * obj.rule[0].patient) + (Variable2 * obj.rule[1].cvc)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rule[0].patient) + (Variable2 * obj.rule[1].cvc)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Dressing = function(BalanceByBox, Variable1, Variable2, Rate, obj) {
        var twoWeek = (((Variable1 * obj.rule[0].dressingCount) + (Variable2 * obj.rule[1].cvc)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rule[0].dressingCount) + (Variable2 * obj.rule[1].cvc)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    // Below are sharing same pattern
    $scope.Syringe3cc = function(BalanceByBox, catheterCount, bonky1, Rate, obj) {
        var bonkyBysyringe = bonky1 / 12;
        var twoWeek = (((catheterCount * obj.rule[0].cvc) + (bonkyBysyringe * obj.rule[1].bonky1)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((catheterCount * obj.rule[0].cvc) + (bonkyBysyringe * obj.rule[1].bonky1)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Syringe10cc = function(BalanceByBox, PatientCount, avo100, catheterCount, Rate, obj) {
        var avoferBysyringe = avo100 / 12;
        var twoWeek = ((((PatientCount * obj.rule[0].patient) - (catheterCount * 1)) + (avoferBysyringe * obj.rule[1].avo100) + (catheterCount * obj.rule[2].cvc)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = ((((PatientCount * obj.rule[0].patient) - (catheterCount * 1)) + (avoferBysyringe * obj.rule[1].avo100) + (catheterCount * obj.rule[2].cvc)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Syringe20cc = function(BalanceByBox, PatientCount, catheterCount, flushingCount, Rate, obj) {
        var twoWeek = (((PatientCount * obj.rule[0].patient) - (catheterCount * obj.rule[1].cvc) - (flushingCount * obj.rule[1].cvc) + (catheterCount * obj.rule[2].flushingCount)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((PatientCount * obj.rule[0].patient) - (catheterCount * obj.rule[1].cvc) - (flushingCount * obj.rule[1].cvc) + (catheterCount * obj.rule[2].flushingCount)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Gauze = function(BalanceByBox, PatientCount, CVC, Rate, obj) {
        var twoWeek = ((((PatientCount * obj.rule[0].patient) - (CVC * obj.rule[0].patient) + (CVC * obj.rule[1].cvc)) * $scope.sessionBetweenOrder * Rate) / obj.looseQuantity) / obj.qtt;
        var minL = ((((PatientCount * obj.rule[0].patient) - (CVC * obj.rule[0].patient) + (CVC * obj.rule[1].cvc)) * $scope.sessionBetweenWaiting * Rate) / obj.looseQuantity) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Cotton = function(BalanceByBox, PatientCount, CVC, Rate, obj) {
        var twoWeek = ((((PatientCount * obj.rule[0].patient) - (CVC * obj.rule[0].patient)) * $scope.sessionBetweenOrder * Rate) / obj.looseQuantity) / obj.qtt;
        var minL = ((((PatientCount * obj.rule[0].patient) - (CVC * obj.rule[0].patient)) * $scope.sessionBetweenWaiting * Rate) / obj.looseQuantity) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    /*
    $scope.Citraflow = function(BalanceByBox, Citraflow, Rate, obj) {
        //var BalanceByBox = Balance / obj.qtt; // query the need to calculate by pieces
        var twoWeek = ((Citraflow * obj.rule[0].cit4) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = ((Citraflow * obj.rule[0].cit4) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    */
    $scope.Chlohexidine = function(Balance, PatientCount, Rate, obj) {
        var BalanceByBox = Balance / obj.qtt;
        var twoWeek = (PatientCount * obj.rule[0].cvc * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].cvc * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.HandTowel = function(Balance, Handtowel, Rate, obj) { // would it be better to count according to consumption ?
        var BalanceByBox = Balance / obj.qtt;
        var twoWeek = (Handtowel * obj.rule[0].patient * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (Handtowel * obj.rule[0].patient * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
});