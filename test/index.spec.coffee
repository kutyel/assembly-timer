describe 'assembly-timer tests', =>

    scope = {}
    ctrl = {}

    beforeEach module 'MyApp'

    beforeEach inject ($controller, $rootScope) =>
        scope = $rootScope.$new()
        ctrl = $controller 'TimerCtrl', $scope: scope
        spyOn scope, '$broadcast'

    it 'variable inicialization', =>
        expect(scope.blink).toBe(true)
        expect(scope.fontSize).toEqual({})
        expect(scope.timerColor).toEqual({})
        expect(scope.deadlineMillis).toBe(0)
        expect(scope.timerRunning).toBe(false)

    it 'time over function', =>
        expect(scope.timerColor.color).toBeUndefined()
        scope.timeOver()
        expect(scope.timerColor.color).toBe('blinking-end')
        scope.blink = false
        scope.timeOver()
        expect(scope.timerColor.color).toBe('end')

    it 'change size function', =>
        for number in [10..100]
            scope.changeSize(number)
            expect(scope.fontSize).toEqual({'font-size': number + 'px'})

    it 'start timer event', =>
        scope.startTimer(100)
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-start')
        expect(scope.timerRunning).toBe(true)
        expect(scope.deadlineMillis).toBe(6000000)

    it 'stop timer event', =>
        scope.stopTimer()
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-stop')
        expect(scope.timerColor).toEqual({})
        expect(scope.deadlineMillis).toEqual(0)
        expect(scope.timerRunning).toBe(false)

    it 'timer tick event', =>
        scope.startTimer(100)
        scope.$broadcast('timer-tick')
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-tick')
        expect(scope.timerRunning).toBe(true)
        expect(scope.deadlineMillis).toBe(6000000)
