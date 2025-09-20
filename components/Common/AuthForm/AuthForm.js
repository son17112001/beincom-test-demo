import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { useAuth } from '../../../hooks/useAuth';
import Button from '../Button';

import styles from './AuthForm.module.scss';

const AuthForm = ({ type = 'login' }) => {
    const intl = useIntl();
    const router = useRouter();
    const { login, register, loading } = useAuth();

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [ errors, setErrors ] = useState({});

    const isLogin = type === 'login';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Tên là bắt buộc';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (isLogin) {
            const result = await login({
                email: formData.email,
                password: formData.password,
            });

            if (result.success) {
                router.push('/');
            }
        } else {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (result.success) {
                router.push('/login');
            }
        }
    };

    return (
        <div className={styles.authForm}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                </h1>

                <p className={styles.subtitle}>
                    {isLogin
                        ? 'Chào mừng bạn quay trở lại!'
                        : 'Tạo tài khoản mới để bắt đầu'
                    }
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {!isLogin && (
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Tên đầy đủ
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={classNames(styles.input, {
                                    [styles.error]: errors.name,
                                })}
                                placeholder="Nhập tên đầy đủ của bạn"
                            />
                            {errors.name && (
                                <span className={styles.errorText}>{errors.name}</span>
                            )}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={classNames(styles.input, {
                                [styles.error]: errors.email,
                            })}
                            placeholder="Nhập email của bạn"
                        />
                        {errors.email && (
                            <span className={styles.errorText}>{errors.email}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={classNames(styles.input, {
                                [styles.error]: errors.password,
                            })}
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        {errors.password && (
                            <span className={styles.errorText}>{errors.password}</span>
                        )}
                    </div>

                    {!isLogin && (
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={classNames(styles.input, {
                                    [styles.error]: errors.confirmPassword,
                                })}
                                placeholder="Nhập lại mật khẩu"
                            />
                            {errors.confirmPassword && (
                                <span className={styles.errorText}>{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    <Button
                        type="primary"
                        buttonType="submit"
                        loading={loading}
                        fullWidth
                        className={styles.submitButton}
                    >
                        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                        <Link href={isLogin ? '/register' : '/login'} className={styles.link}>
                            {isLogin ? ' Đăng ký ngay' : ' Đăng nhập'}
                        </Link>
                    </p>
                </div>

                {isLogin && (
                    <div className={styles.demoCredentials}>
                        <p className={styles.demoTitle}>Demo Credentials:</p>
                        <p>Email: admin@example.com</p>
                        <p>Password: password</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
