import type { EventEmitter } from "events";

declare global {
    var mongoose: any;
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
    };
}