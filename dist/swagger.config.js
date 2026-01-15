"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// swagger.config.ts
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const protocol = process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? "https" : "http";
const port = process.env.PORT || "8080";
const url = `${protocol}://localhost:${port}`;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TypeScript Express API with Swagger by Roberto Pineda',
            version: '1.0.1',
            description: 'A sample API documented with Swagger by RP',
        },
        servers: [
            {
                url,
            },
        ],
    },
    // Path to the API docs (route files)
    apis: [path_1.default.join(__dirname, "routes", "*.{ts,js}")],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
