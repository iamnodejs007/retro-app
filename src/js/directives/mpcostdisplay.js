angular.module('retro').directive('mpCost', () => {
    return {
        restrict: 'E',
        scope: {
            cost: '='
        },
        template: `
                <span class="icon-container">
                    <i class="icon game-icon game-icon-global-mp skill-display-mp"></i> {{cost}} mp
                </span>
            `
    };
});