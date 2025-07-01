// TODO: Juliana Nadruz -> Finalizar tela de Login.
import Link from "next/link";
import styles from "./login.module.css";
import Image from 'next/image';

// Escrever temporariamente em pt-br
export default function Login() {
    return (
        <div className={styles.global}>
            <div className={styles.screen1}>
                <div className={styles.logoWrapper}>
                    <Link href={'home'}>
                        <Image
                        src="/imgs/favicon.png"
                        alt="avaHelper"
                        width={33}
                        height={21}
                        className="filter brightness-0 invert"
                        />
                    </Link>
                    <Link href={'home'}>
                        <h1 className={styles.logoTitle}>avaHelper</h1>
                    </Link>
                </div>
                <div className={styles.imagemContainer}>
                    <img src="/imgs/login.png" alt="" className={styles.backgroundImg} />
                </div>
            </div>
            <div className={styles.screen2}>
                <div className={styles.headerLogo}>
                    <Link href={'home'}>
                        <Image
                        src="/imgs/favicon.png"
                        alt="avaHelper"
                        width={33}
                        height={21}
                        className="filter brightness-0 invert"
                        />
                    </Link>
                    <Link href={'home'}>
                        <h1 className={styles.headerTitle}>avaHelper</h1>
                    </Link>
                </div>
                
                <h2 className={styles.title}>LOGIN</h2>

                <form className={styles.form}>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input type="email" id="email" name="email" required className={styles.input} />

                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input type="password" id="password" name="password" required className={styles.input} />
                    
                    <div className={styles.rememberContainer}>
                        <label htmlFor="remember" className={styles.rememberLabel}>
                            <input type="checkbox" id="remember" className={styles.rememberCheckbox} />Lembrar de mim
                        </label>
                        <a href="/forgot-password" className={styles.forgotLink}>Esqueceu a senha?</a>
                    </div>

                    <input type="submit" value="Entrar" className={styles.submitButton} /> 
                </form>

                <div className={styles.register}>
                    <h1>Não tem uma conta? <a className="text-[#FF5252] " href="/register">Inscreva-se</a></h1>
                </div>

            </div>
        </div>
    );
}
