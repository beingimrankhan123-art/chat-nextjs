// components/Signup.js
'use client';
import { useState } from 'react';
import styles from './LoginForm.module.css';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        console.log('Signup submitted:', formData);
        // Add your signup authentication logic here
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Signup successful. Please login.");
            router.push("/login");
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="signup-fullName" className={styles.label}>
                        Full Name
                    </label>
                    <input
                        type="text"
                        className={`form-control ${styles.input}`}
                        id="signup-fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="signup-email" className={styles.label}>
                        E-mail
                    </label>
                    <input
                        type="email"
                        className={`form-control ${styles.input}`}
                        id="signup-email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="signup-password" className={styles.label}>
                        Password
                    </label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${styles.input}`}
                            id="signup-password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength="6"
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

                <div className="mb-3">
                    <label htmlFor="signup-confirmPassword" className={styles.label}>
                        Confirm Password
                    </label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`form-control ${styles.input}`}
                            id="signup-confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            minLength="6"
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label="Toggle confirm password visibility"
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.loginButton}>
                    Sign up
                </button>

                <div className="text-center mt-3">
                    <p className={styles.termsText}>
                        By signing up, you agree to our{' '}
                        <a href="#" className={styles.termsLink}>
                            Terms & Conditions
                        </a>
                    </p>
                </div>
            </form>
        </>
    );
}