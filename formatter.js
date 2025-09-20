const en = require("./locales/en.json");

function flattenMessages(nestedMessages, prefix = "") {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

exports.format = function (msgs) {
    let results = {};
    const enLang = flattenMessages(en);


    for (const [ id, msg ] of Object.entries(msgs)) {

        if (!msg.defaultMessage) {
            console.log(
                `\x1b[31m[Error]\x1b[0m Invalid defaultMessages:\x1b[33m ${id}`,
            );
        }

        if (enLang[id]) {
            results[id] = enLang[id];
        } else {
            results[id] = msg.defaultMessage;
        }
    }

    return results;
};
