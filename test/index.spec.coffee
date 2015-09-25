describe 'assembly-timer tests', =>

    scope = {}
    vm = {}

    beforeEach module 'app'

    beforeEach inject ($controller, $rootScope) =>
        scope = $rootScope.$new()
        vm = $controller 'TimerCtrl', $scope: scope
        spyOn scope, '$broadcast'

    it 'variable inicialization', =>
        expect(vm.blink).toBe(true)
        expect(vm.fontSize).toEqual({})
        expect(vm.running).toBe(false)

    it 'change size function', =>
        for n in [10..100]
            vm.changeSize(n)
            expect(vm.fontSize).toEqual({'font-size': n + 'px'})

    it 'start timer event', =>
        vm.startTimer(100)
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-start')
        expect(vm.running).toBe(true)

    it 'resume timer event', =>
        vm.resumeTimer()
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-resume')

    it 'stop timer event', =>
        vm.stopTimer()
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-stop')
        expect(vm.running).toBe(false)
