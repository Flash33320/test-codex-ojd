const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bannir un membre",
  requiredPermissions: [PermissionsBitField.Flags.BanMembers],
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) {
      await message.reply("⚠️ Mentionne un membre à bannir.");
      return;
    }

    if (!target.bannable) {
      await message.reply("❌ Je ne peux pas bannir ce membre.");
      return;
    }

    const reason = args.slice(1).join(" ") || "Aucune raison fournie";
    await target.ban({ reason });
    await message.reply(`✅ ${target.user.tag} a été banni. Raison: ${reason}`);
  },
};
