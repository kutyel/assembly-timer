(function() {
    'use strict';

    angular
        .module('app', ['timer'])
        .controller('TimerCtrl', TimerCtrl);

    TimerCtrl.$inject = ['$scope'];

    function TimerCtrl($scope) {
        var vm = this;
        vm.blink = true;
        vm.fontSize = {};
        vm.timerColor = {};
        vm.deadlineMillis = 0;
        vm.timerRunning = false;

        activate();

        function activate() {
            vm.timeOver = timeOver;
            vm.changeSize = changeSize;
            vm.startTimer = startTimer;
            vm.stopTimer = stopTimer;
        }

        function timeOver() {
            vm.timerColor.color = vm.blink ? 'blinking-end' : 'end';
        };

        function changeSize(value) {
            vm.fontSize = { 'font-size': value + 'px' };
        };

        function startTimer(deadline) {
            $scope.$broadcast('timer-start');
            vm.timerRunning = true;
            vm.deadlineMillis += deadline * 1000 * 60;
        };

        function stopTimer() {
            $scope.$broadcast('timer-stop');
            vm.timerColor = {};
            vm.deadlineMillis = 0;
            vm.timerRunning = false;
        };

        $scope.$on('timer-tick', function (event, data) {
            if (vm.timerRunning && data.millis >= vm.deadlineMillis) {
                $scope.$apply(vm.timeOver);
            }
        });
    }
})();
