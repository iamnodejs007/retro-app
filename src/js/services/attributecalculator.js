angular.module('retro').service('AttributeCalculator', (Player, Dice) => {

    const displayData = (effectName) => {
        switch(effectName) {
            case 'Heal':        return { chance: 100, string: 'HP' };
            case 'Refresh':     return { chance: 100, string: 'MP' };
            default:            return { chance: 100, string: 'round' };
        }
    };

    return {
        itemEffects: (item) => {
            return _.map(item.effects, effect => ({
                name: effect.name,
                value: { min_possible: effect.statBuff || effect.duration, max_possible: effect.statBuff || effect.duration },
                extra: displayData(effect.name)
            }));
        },
        skillEffects: (skillRef, useAccuracy = true) => {
            const me = Player.get();
            return _(skillRef.spellEffects)
                .keys()
                .map(key => {
                    const effectData = skillRef.spellEffects[key];
                    const roll = effectData.roll;
                    const stats = roll ? Dice.statistics(roll, me.stats, 1) : null;

                    const retVal = { name: key, value: stats, extra: effectData };
                    if(useAccuracy) retVal.accuracy = me.stats.acc;

                    return retVal;
                })
                // Damage always comes first
                .sortBy((obj) => obj.name === 'Damage' ? '*' : obj.name)
                .value();
        }
    };
});
