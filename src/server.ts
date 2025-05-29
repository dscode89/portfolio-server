import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "hey there!" };
});

router.post("/api/email-enquiry", async (ctx) => {
  console.log(process.env.MAIL_TOKEN);
  var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: process.env.MAIL_TOKEN,
    },
  });

  transport
    .sendMail({
      from: "info@demomailtrap.co",
      to: process.env.EMAIL,
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
    })
    .then(console.log, console.error);
});

//you have to register the routing middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server listening on PORT 3000...");
});
