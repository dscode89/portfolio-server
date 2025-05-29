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
  const requestBody = ctx.request.body as {
    name: string;
    email: string;
    message: string;
  };
  const transport = nodemailer.createTransport({
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
});

//you have to register the routing middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server listening on PORT 3000...");
});
