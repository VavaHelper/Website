// TODO: Juliana Nadruz -> Finalizar tela de Login.
import styles from "./login.module.css";

export default function Login() {
    return (
        <div className={styles.global}>
            <div className={styles.screen1}>
                <img src="logo" alt="Logo" className={styles.logoImg} />
                <h1 className={styles.logoTitle}>avaHelper</h1>
                    <div className={styles.imagemContainer}>
                        <img src="/imgs/login.png" alt="" className={styles.backgroundImg} />
                    </div>
            </div>
            <div className={styles.screen2}>
                <h2 className={styles.title}>Login</h2>

                <form className={styles.form}>
                    <label htmlFor="email" className={styles.label}>E-mail:</label>
                    <input type="email" id="email" name="email" required className={styles.input} />

                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input type="password" id="password" name="password" required className={styles.input} />

                    <a href="#" className={styles.forgotLink}>Esqueceu a senha?</a>

                    <input type="submit" value="Enviar" className={styles.submitButton} />
                </form>
            </div>
        </div>
    );
}
