'use client';

import { useState } from 'react';
import styles from './LoginForm.module.css';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔐 NextAuth login
        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false, // important
        });
        console.log("res", res)
        if (!res.error) {
            router.push("/chat");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="login-email" className={styles.label}>
                        E-mail
                    </label>
                    <input
                        type="email"
                        className={`form-control ${styles.input}`}
                        id="login-email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="login-password" className={styles.label}>
                        Password
                    </label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${styles.input}`}
                            id="login-password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.loginButton}>
                    Log in
                </button>

                <div className="text-center mt-3">
                    <a href="#" className={styles.forgotPassword}>
                        Forget your password?
                    </a>
                </div>
            </form>
        </>
    );
}
