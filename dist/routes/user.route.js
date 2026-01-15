"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const controller = __importStar(require("../controllers/user.controller"));
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });
    /**
     * @swagger
     * components:
     *   schemas:
     *     ErrorMessage:
     *       type: object
     *       properties:
     *         message:
     *           type: string
     *           example: "Usuario no encontrado"
     */
    /**
     * @swagger
     * /api/test/all:
     *   get:
     *     summary: Contenido publico
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Texto de contenido publico.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Contenido Public"
     */
    app.get("/api/test/all", controller.allAccess);
    /**
     * @swagger
     * /api/test/user:
     *   get:
     *     summary: Contenido para usuarios autenticados
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Texto de contenido del usuario.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Contenido del Usuario pepe"
     *       401:
     *         description: Token no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     *       404:
     *         description: Usuario no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     */
    app.get("/api/test/user", [middlewares_1.authJwt.verifyToken], controller.onlyUser);
    /**
     * @swagger
     * /api/test/moderator:
     *   get:
     *     summary: Contenido para moderadores
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Texto de contenido del moderator.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Contenido del Moderator"
     *       401:
     *         description: Token no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     *       403:
     *         description: Se requiere el rol de Moderator.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     */
    app.get("/api/test/moderator", [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isModerator], controller.onlyModerator);
    /**
     * @swagger
     * /api/test/admin:
     *   get:
     *     summary: Contenido para administradores
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Texto de contenido del admin.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Contenido del Admin"
     *       401:
     *         description: Token no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     *       403:
     *         description: Se requiere el rol de Administrador.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ErrorMessage"
     */
    app.get("/api/test/admin", [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isAdmin], controller.onlyAdmin);
};
