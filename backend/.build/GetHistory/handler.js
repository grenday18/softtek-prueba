"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckStatus = void 0;
const merged_layer_1 = require("merged-layer");
const getCheckStatus = async (event) => {
    return merged_layer_1.ApiGatewayHelper.formatJSONResponseOk({
        status: "ok"
    });
};
exports.getCheckStatus = getCheckStatus;
//# sourceMappingURL=handler.js.map