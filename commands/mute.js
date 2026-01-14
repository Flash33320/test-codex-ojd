const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mettre un membre en timeout (en minutes)",
  requiredPermissions: [PermissionsBitField.Flags.ModerateMembers],
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) {
      await message.reply("⚠️ Mentionne un membre à mettre en timeout.");
      return;
    }

    const minutes = Number.parseInt(args[1], 10);
    if (!minutes || Number.isNaN(minutes) || minutes <= 0) {
      await message.reply(
        "⚠️ Indique une durée en minutes (ex: !mute @user 10 raison)."
      );
      return;
    }

    if (!target.moderatable) {
      await message.reply("❌ Je ne peux pas modérer ce membre.");
      return;
    }

    const reason = args.slice(2).join(" ") || "Aucune raison fournie";
    const durationMs = minutes * 60 * 1000;

    await target.timeout(durationMs, reason);
    await message.reply(
      `✅ ${target.user.tag} est en timeout pour ${minutes} minute(s). Raison: ${reason}`
    );
  },
};
