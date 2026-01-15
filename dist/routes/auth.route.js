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
exports.default = authRoutes;
const middlewares_1 = require("../middlewares");
const controller = __importStar(require("../controllers/auth.controller"));
function authRoutes(app) {
    app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });
    /**
     * @swagger
     * components:
     *   schemas:
     *     SignupRequest:
     *       type: object
     *       required:
     *         - username
     *         - email
     *         - password
     *       properties:
     *         username:
     *           type: string
     *           example: "pepe"
     *         email:
     *           type: string
     *           format: email
     *           example: "pepe@correo.com"
     *         password:
     *           type: string
     *           format: password
     *           example: "123456"
     *         roles:
     *           type: array
     *           items:
     *             type: string
     *           example: ["user"]
     *     SigninRequest:
     *       type: object
     *       required:
     *         - username
     *         - password
     *       properties:
     *         username:
     *           type: string
     *           example: "pepe"
     *         password:
     *           type: string
     *           format: password
     *           example: "123456"
     *     SignupResponse:
     *       type: object
     *       properties:
     *         message:
     *           type: string
     *           example: "Usuario Creado Correctamente"
     *     SigninResponse:
     *       type: object
     *       properties:
     *         id:
     *           type: string
     *           example: "507f1f77bcf86cd799439011"
     *         username:
     *           type: string
     *           example: "pepe"
     *         email:
     *           type: string
     *           format: email
     *           example: "pepe@correo.com"
     *         roles:
     *           type: array
     *           items:
     *             type: string
     *           example: ["user"]
     *     MessageResponse:
     *       type: object
     *       properties:
     *         message:
     *           type: string
     *           example: "Tu sesion ha terminado"
     */
    /**
     * @swagger
     * /api/auth/signup:
     *   post:
     *     summary: Registrar usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SignupRequest"
     *     responses:
     *       200:
     *         description: Usuario creado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/SignupResponse"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     */
    app.post("/api/auth/signup", [
        middlewares_1.verifySignUp.checkDuplicateUsernameOrEmail,
        middlewares_1.verifySignUp.checkRoleExisted
    ], controller.signup);
    /**
     * @swagger
     * /api/auth/signout:
     *   post:
     *     summary: Cerrar sesion
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Sesion cerrada.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     */
    app.post("/api/auth/signout", controller.signout);
    /**
     * @swagger
     * /api/auth/signin:
     *   post:
     *     summary: Iniciar sesion
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/SigninRequest"
     *     responses:
     *       200:
     *         description: Usuario autenticado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/SigninResponse"
     *       401:
     *         description: Password invalido.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     *       404:
     *         description: Usuario no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/MessageResponse"
     */
    app.post("/api/auth/signin", controller.signin);
}
