export default {
    name: 'messageCreate',
    async execute(message, client) {
      // First handle commands
      if (message.author.bot) return;
  
      // Image-only channel check
      const imageOnlyChannelId = "1144039549283074098";
      if (message.channelId === imageOnlyChannelId) {
        const hasImage = message.attachments.some(attachment => 
          attachment.contentType?.startsWith('image/'));
        
        if (!hasImage) {
          try {
            await message.delete();
            const warning = await message.channel.send(
              `${message.author}, sua liberdade de expressão foi tolido e cerceada por mim.`
            );
            // Delete the warning message after 5 seconds
            setTimeout(() => warning.delete().catch(() => {}), 5000);
            return;
          } catch (error) {
            console.error('Error deleting non-image message:', error);
          }
        }
      }
    }
  };