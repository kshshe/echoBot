require("dotenv").config({});
const { Telegraf } = require("telegraf");

if (!process.env.TOKEN) {
  console.log(
    "No access token found in .env file. Get one from @BotFather and create .env file with it."
  );
}

const bot = new Telegraf(process.env.TOKEN);

bot.use(async (ctx, next) => {
  await next();
  if (!ctx.chat) {
    return;
  }
  await ctx.reply(`\`\`\`${JSON.stringify(ctx.update, null, 2)}\`\`\``, {
    parse_mode: "Markdown",
  });
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
