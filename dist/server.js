"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa_bodyparser_1.default)());
router.get("/", (ctx) => {
    ctx.status = 200;
    ctx.body = { msg: "hey there!" };
});
router.post("/api/email-enquiry", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = ctx.request.body;
    const transport = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "d5d4abee7dc43d",
            pass: "80cf882031c0cc",
        },
    });
    transport
        .sendMail({
        from: "info@mailtrap.co",
        to: process.env.EMAIL,
        subject: "New website enquiry!",
        text: "hello",
        html: `<h2>New Enquiry<h2><br></br><p><strong>Name:</strong>${requestBody.name}</p>
      <br></br><p><strong>Email:</strong>${requestBody.email}</p><br></br><p><strong>Name:</strong>${requestBody.name}</p>
      <br></br><p><strong>Message:</strong>${requestBody.message}</p>`,
    })
        .then(console.log, console.error);
}));
//you have to register the routing middleware
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log("Server listening on PORT 3000...");
});
