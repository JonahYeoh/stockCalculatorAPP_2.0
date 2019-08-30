/**
 * http://usejsdoc.org/
 */
// style="height:8px;border-bottom:none;border: 1px solid black;"
var background = { "background-color": "#C1D786" };
var rowStyle = { "height": "8px", "border-bottom": "none", "border": "1px solid black" };
var cellStyle = { "border-bottom": "none", "border": "1px solid black" };
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.departments = ['PGDC/L4', 'PGDC/L5'];
    $scope.sessionBetweenWaiting = 5;
    $scope.sessionBetweenOrder = 6;
    $scope.lowRisk = 1.05;
    $scope.mediumRisk = 1.08;
    $scope.highRisk = 1.10;
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
        if (quantity > obj.maxCap)
            console.log(obj.name + " on High Alert");
        else if (quantity < obj.maxCap / 3)
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
    $scope.Concentrate_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var oneWeek = (PatientCount * obj.rule[0].dialysate * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].dialysate * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        var quantity = $scope.finalCheck(BalanceByBox, minL, oneWeek, obj);
        return quantity;
    };
    $scope.Concentrate_W2 = function(PatientCount, Rate, obj) {
        var quantity = (PatientCount * obj.rule[0].dialysate * 3 * Rate) / obj.qtt;
        return Math.ceil(quantity);
    };
    $scope.BiBag_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var twoWeek = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].patient * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        var quantity = $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
        return quantity;
    };
    $scope.BiBag_W2 = function(PatientCount, Rate, obj) {
        var quantity = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        return Math.ceil(quantity);
    };
    $scope.Bloodline_W1 = function(BalanceByBox, PatientCount, Rate, obj) {
        var twoWeek = (PatientCount * obj.rule[0].patient * 3 * Rate) / obj.qtt;
        var minL = (PatientCount * obj.rule[0].patient * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        var quantity = $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
        return quantity;
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
    $scope.NormalSaline = function(BalanceByBox, Variable1, Variable2, Rate, obj) {
        var twoWeek = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.SingleUse = function(BalanceByBox, Variable1, Variable2, Rate, obj) { // ?? Hepatits Patient is not included in Isolation Patient
        var twoWeek = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((Variable1 * obj.rules[0].rule) + (Variable2 * obj.rules[1].rule)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    // Below are sharing same pattern
    $scope.Syringe3cc = function(BalanceByBox, cvc, bonky, Rate, obj) {
        var twoWeek = (((cvc * obj.rules[0].cvc) + (bonky * obj.rules[1].bonky)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((cvc * obj.rules[0].cvc) + (bonky * obj.rules[1].bonky)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Syringe10cc = function(BalanceByBox, PatientCount, avofer, cvc, Rate, obj) {
        var twoWeek = ((((PatientCount * obj.rules[0].patient) - (cvc * 1)) + ((avofer * obj.rules[1].avofer) + (cvc * obj.rules[2].cvc))) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = ((((PatientCount * obj.rules[0].patient) - (cvc * 1)) + ((avofer * obj.rules[1].avofer) + (cvc * obj.rules[2].cvc))) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
    $scope.Syringe20cc = function(BalanceByBox, PatientCount, cvc, heparin, Rate, obj) {
        var twoWeek = (((PatientCount * obj.rules[0].patient) + ((cvc * obj.rule[1].cvc) - (heparin * obj.rules[1].heparin)) + (cvc * obj.rules[2].cvc)) * $scope.sessionBetweenOrder * Rate) / obj.qtt;
        var minL = (((PatientCount * obj.rules[0].patient) + ((cvc * obj.rule[1].cvc) - (heparin * obj.rules[1].heparin)) + (cvc * obj.rules[2].cvc)) * $scope.sessionBetweenWaiting * Rate) / obj.qtt;
        return $scope.finalCheck(BalanceByBox, minL, twoWeek, obj);
    };
});