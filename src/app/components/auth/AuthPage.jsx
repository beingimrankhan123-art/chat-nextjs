'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import Login from './Login';
import Signup from './SignUp';

export default function AuthPage() {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === '/login';

  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Section */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className={styles.formWrapper}>
              <h1 className={styles.welcomeTitle}>
                Welcome <span className={styles.waveEmoji}>👋</span>
              </h1>

              <p className={styles.subtitle}>
                Please, enter your details and start your work!
              </p>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
                  onClick={() => router.push('/login')}
                >
                  Log in
                </button>

                <button
                  className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </button>
              </div>

              {/* Route-based rendering */}
              {isLogin ? <Login /> : <Signup />}
            </div>
          </div>

          {/* Right Section */}
          <div className={`col-lg-6 d-none d-lg-flex ${styles.illustrationSection}`}>
            <div className={styles.loginText}>
              {isLogin ? 'Login' : 'Sign up'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
