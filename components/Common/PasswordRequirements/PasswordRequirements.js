import React from "react";

import styles from "./PasswordRequirements.module.scss";

const PasswordRequirements = ({ password = "" }) => {
    const requirements = [
        {
            text: "At least 8-20 characters",
            isValid: password.length >= 8 && password.length <= 20,
        },
        {
            text: "At least 01 upper case letter (A-Z)",
            isValid: /[A-Z]/.test(password),
        },
        {
            text: "At least 01 lower case letter (a-z)",
            isValid: /[a-z]/.test(password),
        },
        {
            text: "At least 01 digit (0-9)",
            isValid: /\d/.test(password),
        },
        {
            text: "At least 01 special character (!@#$...)",
            isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
        {
            text: "First and last characters don't contain whitespace",
            isValid: password.length === 0 || (!password.startsWith(" ") && !password.endsWith(" ")),
        },
    ];

    return (
        <div className={styles.requirements}>
            {requirements.map((requirement, index) => (
                <div key={index} className={styles.requirement}>
                    <div className={`${styles.checkbox} ${requirement.isValid ? styles.checked : ""}`}>
                        {requirement.isValid && "✓"}
                    </div>
                    <span className={`${styles.text} ${requirement.isValid ? styles.valid : ""}`}>
                        {requirement.text}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PasswordRequirements;
