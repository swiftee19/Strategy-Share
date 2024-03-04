import { Canister, Opt, Record, Result, StableBTreeMap, Vec, query, text, update } from 'azle';
import { v4 as uuidv4 } from 'uuid';

const Strategy = Record({
    id: text,
    gameName: text,
    gameStrategy: text,
    dateJoined: text
});

type Strategy = typeof Strategy.tsType;

const strategies = StableBTreeMap<text, Strategy>(0);

export default Canister({
    insertStrategy: update([text, text], Strategy, (gameName, gameStrategy) => {
        const newStrategy: Strategy = {
            id: uuidv4(),
            gameName,
            gameStrategy,
            dateJoined: new Date().toISOString()
        }

        strategies.insert(newStrategy.id, newStrategy);

        return newStrategy;
    }),
    getAllStrategies: query([], Vec(Strategy), () => {
        return strategies.values();
    }),
    getStrategiesByGameName: query([text], Vec(Strategy), (gameName) => {
        return strategies.values().filter((strategy) => strategy.gameName.includes(gameName));
    })
})
