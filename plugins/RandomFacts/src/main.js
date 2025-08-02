import { registerCommand } from "@vendetta/commands";

const webhookUrl = "https://discord.com/api/webhooks/1400980346287161445/EKLmwQ2vwaawq8bfBPKlV_iBkqgJ87eRiFPnxoI6KTwFe7XwUR9I8nLc2u_ZeJD90zZt";

let webhookCommand;

async function sendWebhookMessage(message) {
  const messagePayload = { content: message };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) {
      return `Failed to send message: ${response.status} ${response.statusText}`;
    }
    return "Message sent successfully!";
  } catch (e) {
    return `Error sending message: ${e.message}`;
  }
}

export const onLoad = () => {
  webhookCommand = registerCommand({
    name: "webhookmsg",
    displayName: "webhookmsg",
    description: "Send any message through the Discord webhook.",
    displayDescription: "Send any message through the Discord webhook.",
    applicationId: "-1",
    inputType: 1,
    type: 1,
    options: [
      {
        name: "message",
        description: "The message to send through the webhook",
        required: true,
        type: 3, // STRING type
      },
    ],

    execute: async (args) => {
      const message = args[0]?.value;
      if (!message) return { content: "You must provide a message!" };

      const result = await sendWebhookMessage(message);
      return { content: result };
    },
  });
};

export const onUnload = () => {
  webhookCommand();
};