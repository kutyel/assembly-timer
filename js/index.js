angular.module('MyApp', ['timer'])
.controller('TimerCtrl', ['$scope', function ($scope) {

    $scope.blink = true;
    $scope.fontSize = {};
    $scope.timerColor = {};
    $scope.deadlineMillis = 0;
    $scope.timerRunning = false;

    $scope.timeOver = function () {
        $scope.timerColor.color = $scope.blink ? 'blinking-end' : 'end';
    };

    $scope.changeSize = function (value) {
        $scope.fontSize = { 'font-size': value + 'px' };
    };

    $scope.startTimer = function (deadline) {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
        $scope.deadlineMillis += deadline * 1000 * 60;
    };

    $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerColor = {};
        $scope.deadlineMillis = 0;
        $scope.timerRunning = false;
    };

    $scope.$on('timer-tick', function (event, data) {
        if ($scope.timerRunning && data.millis >= $scope.deadlineMillis) {
            $scope.$apply($scope.timeOver);
        }
    });
}]);
