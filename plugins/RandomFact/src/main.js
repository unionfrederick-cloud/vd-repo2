import { registerCommand } from "@vendetta/commands"
import { findByProps } from "@vendetta/metro"

const MessageActions = findByProps("sendMessage", "receiveMessage")

let commands = [
]

const fact = async function () {
    const response = await fetch(`https://a.jdev.eu.org/fact/specify/count/random/1`);
    const resp = await response.json();
    return resp["0"]
}

commands.push(registerCommand({
    name: "fact",
    displayName: "fact",
    description: "Sends a random fact.",
    displayDescription: "Sends a random fact.",
    applicationId: -1,
    inputType: 1,
    type: 1,

    execute: async (ctx) => MessageActions.sendMessage(ctx.channel.id, {
        content: await fact()
    })
}))