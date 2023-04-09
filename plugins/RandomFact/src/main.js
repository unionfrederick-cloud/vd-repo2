import { registerCommand } from "@vendetta/commands"


let factCommand = [
]

const fact = async function () {
    const response = await fetch(`https://a.jdev.eu.org/fact/specify/count/random/1`);
    const resp = await response.json();
    return resp["0"]
}

export const onLoad = () => {
    factCommand = registerCommand({
        name: "fact",
        displayName: "fact",
        description: "Sends a random fact.",
        displayDescription: "Sends a random fact.",
        applicationId: -1,
        inputType: 1,
        type: 1,

        execute: async () => { return { content: await fact() }}
    });
}

export const onUnload = () => {
    factCommand();
}