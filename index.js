const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  PermissionsBitField,
} = require("discord.js");

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX || "!";

if (!token) {
  throw new Error("DISCORD_TOKEN manquant dans le fichier .env");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command?.name && typeof command.execute === "function") {
    client.commands.set(command.name, command);
  }
}

client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  console.log(`Préfixe actif: ${prefix}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) {
    return;
  }

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) {
    return;
  }

  const command = client.commands.get(commandName);
  if (!command) {
    return;
  }

  const requiredPermissions = command.requiredPermissions || [];
  if (
    requiredPermissions.length > 0 &&
    !message.member.permissions.has(requiredPermissions)
  ) {
    await message.reply(
      "⛔ Tu n'as pas la permission d'utiliser cette commande."
    );
    return;
  }

  try {
    await command.execute(message, args, { prefix, PermissionsBitField });
  } catch (error) {
    console.error(`Erreur sur la commande ${commandName}:`, error);
    await message.reply("❌ Une erreur est survenue pendant la commande.");
  }
});

client.login(token);
