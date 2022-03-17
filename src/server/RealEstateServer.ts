import { TYPES } from './../components/MainPanel';
import { getRandomInt } from './../tools/helper';
import { createServer, Model, Factory } from "miragejs"

export const STATES = [
    'Georgia',
    'Wyoming',
    'Montana'
]

export const CITYS = [
    'Attleboro',
    'Enterprise',
    'South Hill'
]

function getRadomString(target: Array<string>): string {
    return target[getRandomInt(target.length)];
}

export default createServer({
    models: {
        propertie: Model
    },

    factories: {
        propertie: Factory.extend({
            state: () => getRadomString(STATES),
            city: () => getRadomString(CITYS),
            type: () => TYPES[getRandomInt(TYPES.length)],
            price: () => getRandomInt(1900) + 100
        })
    },

    seeds(server) {
        server.createList('propertie', 20);
    },

    routes() {
        this.namespace = "api";
        this.get("/properties", (schema) => {
            let res: any = schema;
            return res.properties.all();
        },{ timing: 3000 }) ;
    },
})