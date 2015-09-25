(function() {
    'use strict';

    angular
        .module('app', ['timer'])
        .controller('TimerCtrl', TimerCtrl);

    TimerCtrl.$inject = ['$scope'];

    function TimerCtrl($scope) {
        var vm = this;

        vm.blink = true;
        vm.running = false;
        vm.fontSize = {};

        init();

        function init() {
            vm.changeSize = changeSize;
            vm.startTimer = startTimer;
            vm.resumeTimer = resumeTimer;
            vm.stopTimer = stopTimer;
        }

        function changeSize(value) {
            vm.fontSize = { 'font-size': value + 'px' };
        }

        function startTimer() {
            vm.running = true;
            $scope.$broadcast('timer-start');
        }

        function resumeTimer() {
            $scope.$broadcast('timer-resume');
        }

        function stopTimer() {
            vm.running = false;
            $scope.$broadcast('timer-stop');
        }
    }
})();
