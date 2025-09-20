import React from "react";
import { defineMessages } from "react-intl";

import useTranslate from "@/hooks/useTranslate";

import Form from "./Form";

const messages = defineMessages({
    notEmpty: {
        id: "components.Common.Form.FormItem.notEmpty",
        defaultMessage: "{label} không được bỏ trống",
    },
});

function FormItem({
    children,
    required,
    rules = [],
    name,
    label,
    placeholder,
    requireMessage,
    whitespaceMessage,
    ...props
}) {
    const translate = useTranslate();

    const _rules = rules || [];
    const _label = label || placeholder || "";

    if (required) {
        _rules.push(
            {
                required: true,
                message: requireMessage || translate.formatMessage(messages.notEmpty, { label: _label }),
            },
            // {
            //     whitespace: true,
            //     message: whitespaceMessage || `${_label} không được chỉ chứa khoảng trắng`,
            // },
        );
    }

    const cloneElement = (children) => React.cloneElement(children, { label, placeholder });

    return (
        <Form.Item {...props} name={name} rules={_rules}>
            {typeof children === "function"
                ? (control, meta, form) => cloneElement(children(control, meta, form))
                : cloneElement(children)}
        </Form.Item>
    );
}

export default FormItem;
