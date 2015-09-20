'use strict';

describe('assembly-timer tests', function () {
    var ctrl, scope;

    beforeEach(module('MyApp'));

    beforeEach(inject(function ($controller, $rootScope){
        scope = $rootScope.$new();
        ctrl = $controller('TimerCtrl', {
            $scope: scope
        })
        spyOn(scope, '$broadcast');
    }));

    it('variable inicialization', function(){
        expect(scope.blink).toBe(true);
        expect(scope.fontSize).toEqual({});
        expect(scope.timerColor).toEqual({});
        expect(scope.deadlineMillis).toBe(0);
        expect(scope.timerRunning).toBe(false);
    });

    it('time over function', function(){
        expect(scope.timerColor.color).toBeUndefined();
        scope.timeOver();
        expect(scope.timerColor.color).toBe('blinking-end');
        scope.blink = false;
        scope.timeOver();
        expect(scope.timerColor.color).toBe('end');
    });

    it('change size function', function(){
        scope.changeSize(20);
        expect(scope.fontSize).toEqual({ 'font-size': '20px' });
    })

    it('start timer event', function(){
        scope.startTimer(100);
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-start');
        expect(scope.timerRunning).toBe(true);
        expect(scope.deadlineMillis).toBe(6000000);
    });

    it('stop timer event', function(){
        scope.stopTimer();
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-stop');
        expect(scope.timerColor).toEqual({});
        expect(scope.deadlineMillis).toEqual(0);
        expect(scope.timerRunning).toBe(false);
    });

    it('timer tick event', function(){
        scope.startTimer(100);
        scope.$broadcast('timer-tick');
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-tick');
        expect(scope.timerRunning).toBe(true);
        expect(scope.deadlineMillis).toBe(6000000);
    })

});
