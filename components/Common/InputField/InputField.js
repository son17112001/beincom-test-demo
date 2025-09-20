import React from "react";
import classNames from "classnames";
import styles from "./InputField.module.scss";

const InputField = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
    className,
    ...props
}) => {
    return (
        <div className={classNames(styles.field, className)}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={classNames(styles.input, {
                    [styles.error]: error,
                })}
                {...props}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default InputField;
