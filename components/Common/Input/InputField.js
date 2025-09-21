import Form from "@/components/Common/Form/Form";

import Input from ".";

function InputField({
    name = "",
    rules = [],
    label = "",
    required = false,
    placeholder = "",
    requireMessage = "",
    fieldProps,
    disabled = false,
    type = "text",
    onChange,
    className,
    ...props
}) {
    return (
        <Form.Item
            {...props}
            required={required}
            name={name}
            rules={rules}
            label={label}
            placeholder={placeholder}
            requireMessage={requireMessage}
        >
            <Input
                withSearch={type === "search"}
                className={className}
                onChange={onChange}
                disabled={disabled}
                type={type}
                {...fieldProps}
            />
        </Form.Item>
    );
}

export default InputField;
