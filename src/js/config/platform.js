angular.module('retro').run(($rootScope, $ionicPlatform, $ionicHistory) => {

    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.hideMenu = toState.name === 'home' || toState.name === 'create' || toState.name === 'battle';
        $rootScope.actionButton = null;
    });

    $ionicPlatform.registerBackButtonAction(() => {
        $ionicHistory.goBack();
    }, 100);


    $ionicPlatform.ready(() => {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if(window.StatusBar) {
            window.StatusBar.styleDefault();
        }
    });
});