var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/worker-lib/dist/index.js
var require_dist = __commonJS({
  "node_modules/worker-lib/dist/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initWorker = exports.createWorker = void 0;
    var init = (worker) => {
      return new Promise((resolve) => {
        worker.addEventListener("message", () => {
          resolve(worker);
        }, { once: true });
      });
    };
    var exec = (worker, name, ...value) => {
      return new Promise((resolve, reject) => {
        const p = (result) => __awaiter(void 0, void 0, void 0, function* () {
          const { data } = result;
          switch (data.type) {
            case "callback":
              const r = value[data.payload.index](data.payload.value);
              worker.postMessage({
                type: "callback_result",
                payload: { id: data.payload.id, result: yield r }
              });
              break;
            case "result":
              worker.removeEventListener("message", p);
              resolve(data.payload);
              break;
            case "error":
              worker.removeEventListener("message", p);
              reject(data.payload);
              break;
          }
        });
        worker.addEventListener("message", p);
        worker.postMessage({
          type: "function",
          payload: {
            name,
            value: value.map((v) => !(typeof v === "function") && v),
            callback: value.map((v) => typeof v === "function")
          }
        });
      });
    };
    var createWorker = (builder, limit = 0) => {
      let workers = 0;
      const unuses = [];
      const jobs = [];
      return (name, ...value) => {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
          jobs.push({ resolve, reject, name, value });
          let worker = unuses.pop();
          if (limit === 0 || workers < limit) {
            worker = yield init(builder());
            workers++;
          }
          if (worker) {
            while (jobs.length) {
              const { resolve: resolve2, reject: reject2, name: name2, value: value2 } = jobs.shift();
              yield exec(worker, name2, ...value2).then((v) => resolve2(v)).catch((e) => reject2(e));
            }
            unuses.push(worker);
          }
        }));
      };
    };
    exports.createWorker = createWorker;
    var initWorker2 = (WorkerProc) => {
      const worker = self;
      worker.addEventListener("message", (e) => __awaiter(void 0, void 0, void 0, function* () {
        const data = e.data;
        if (data.type === "function") {
          const { name, value, callback } = data.payload;
          const proc = WorkerProc[name];
          if (proc) {
            try {
              const params = value.map((v, index) => callback[index] ? (...params2) => callbackProc(worker, index, params2) : v);
              worker.postMessage({
                type: "result",
                payload: yield proc(...params)
              });
            } catch (e2) {
              worker.postMessage({ type: "error", payload: String(e2) });
            }
          }
        }
      }));
      worker.postMessage(void 0);
      return WorkerProc;
    };
    exports.initWorker = initWorker2;
    var callbackProc = (worker, index, params) => {
      const id = WorkerValue.id++;
      return new Promise((resolve) => {
        worker.addEventListener("message", (e) => {
          const data = e.data;
          if (data.type === "callback_result" && data.payload.id === id) {
            resolve(data.payload.result);
          }
        }, { once: true });
        worker.postMessage({
          type: "callback",
          payload: { id, index, value: params }
        });
      });
    };
    var WorkerValue = { id: 0, promises: {} };
  }
});

// src/worker.ts
var import_worker_lib = __toESM(require_dist(), 1);
var encoderModule;
var getModule = async () => {
  const encoder = await import("./avif.js").then((m) => m.default);
  if (!encoderModule) {
    let module = await encoder().catch(() => null);
    if (!module) {
      module = await encoder();
      if (!module)
        throw new Error("module failed to load");
    }
    encoderModule = module;
  }
  return encoderModule;
};
var encode = async (data, width, height, quality) => {
  return (await getModule()).encode(data, width, height, quality);
};
var map = (0, import_worker_lib.initWorker)({ encode });
