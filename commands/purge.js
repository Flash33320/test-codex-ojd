const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Supprimer plusieurs messages d'un salon",
  requiredPermissions: [PermissionsBitField.Flags.ManageMessages],
  async execute(message, args) {
    const amount = Number.parseInt(args[0], 10);
    if (!amount || Number.isNaN(amount)) {
      await message.reply("⚠️ Indique un nombre de messages à supprimer.");
      return;
    }

    if (amount < 1 || amount > 100) {
      await message.reply("⚠️ Tu dois choisir un nombre entre 1 et 100.");
      return;
    }

    await message.delete();
    const deleted = await message.channel.bulkDelete(amount, true);
    const reply = await message.channel.send(
      `🧹 ${deleted.size} messages supprimés.`
    );
    setTimeout(() => reply.delete().catch(() => {}), 5000);
  },
};
