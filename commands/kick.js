const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Expulser un membre",
  requiredPermissions: [PermissionsBitField.Flags.KickMembers],
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) {
      await message.reply("⚠️ Mentionne un membre à expulser.");
      return;
    }

    if (!target.kickable) {
      await message.reply("❌ Je ne peux pas expulser ce membre.");
      return;
    }

    const reason = args.slice(1).join(" ") || "Aucune raison fournie";
    await target.kick(reason);
    await message.reply(`✅ ${target.user.tag} a été expulsé. Raison: ${reason}`);
  },
};
