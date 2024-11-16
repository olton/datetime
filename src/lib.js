import {Datetime, datetime, info} from "./core.js";

Datetime.info = info

globalThis.Datetime = Datetime
globalThis.datetime = datetime

info()