"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const protocol = process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? "https" : "http";
const port = process.env.PORT || "8080";
const url = `${protocol}://localhost:${port}`;
const host = `localhost:${port}`;
const doc = {
    info: {
        title: 'TypeScript Express API with Swagger by Roberto Pineda',
        version: '1.0.1',
        description: 'A sample API documented with Swagger by RP',
    },
    host,
    // Other options like security definitions, schemas, etc.
};
const outputFile = './swagger-output.json';
// Use the root file where your main routes are defined (e.g., './src/app.ts' or './dist/app.js' if you build first)
const endpointsFiles = [path_1.default.join(__dirname, "routes", "*.{ts,js}")];
// Use the ES module default import pattern
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(async () => {
    // You can import and start your main application after the docs are generated
    // await import('./src/app.js'); 
});
