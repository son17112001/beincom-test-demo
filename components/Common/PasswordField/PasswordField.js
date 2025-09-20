import React, { useState } from "react";
import classNames from "classnames";

import PasswordRequirements from "../PasswordRequirements";

import styles from "./PasswordField.module.scss";

const PasswordField = ({
    label,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    className,
    showRequirements = false,
    ...props
}) => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isFocused, setIsFocused ] = useState(false);
    const [ showRequirementsState, setShowRequirementsState ] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (showRequirements) {
            setTimeout(() => setShowRequirementsState(true), 100);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        setTimeout(() => setShowRequirementsState(false), 200);
    };

    return (
        <div className={classNames(styles.field, className)}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <div className={styles.passwordWrapper}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={classNames(styles.input, {
                        [styles.error]: error,
                    })}
                    {...props}
                />
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {showRequirements && showRequirementsState && (
                <div className={styles.requirementsDropdown}>
                    <PasswordRequirements password={value} />
                </div>
            )}
        </div>
    );
};

export default PasswordField;
