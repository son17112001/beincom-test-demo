import { FormattedMessage, useIntl } from "react-intl";

const isFormattedMessageElement = (obj) => obj?.type === FormattedMessage;

const isMessageKey = (obj) =>
    !!obj && typeof obj === "object" && [ "id", "defaultMessage" ].every((key) => key in obj);

function useTranslate() {
    const intl = useIntl();

    // Example: components\layouts\Header\Menu\Menu.js
    const formatMessageOptions = (
        options = [],
        label = "label",
        formatFunction = "formatMessage",
    ) => {
        return options?.map((item) => ({ ...item, [label]: intl[formatFunction](item[label]) }));
    };

    const getPureText = (obj) => {
        if (typeof obj === "string") {
            return obj;
        }

        if (isFormattedMessageElement(obj)) {
            return intl.formatMessage(obj.props);
        }

        if (isMessageKey(obj)) {
            return intl.formatMessage(obj);
        }

        return "";
    };

    const renderUnknownFormatMessage = (obj) => {
        if (isMessageKey(obj)) {
            return intl.formatMessage(obj);
        }

        return obj;
    };

    return { ...intl, formatMessageOptions, getPureText, renderUnknownFormatMessage };
}

export default useTranslate;
