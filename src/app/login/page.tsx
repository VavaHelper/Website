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
                <h2 className={styles.title}>LOGIN</h2>

                <form className={styles.form}>
                    <label htmlFor="email" className={styles.label}>E-mail:</label>
                    <input type="email" id="email" name="email" required className={styles.input} />

                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input type="password" id="password" name="password" required className={styles.input} />
                    <div className={styles.rememberContainer}>
                        <label htmlFor="remember" className={styles.rememberLabel}>
                            <input type="checkbox" id="remember" className={styles.rememberCheckbox} /> Lembrar de mim
                        </label>
                        <a href="#" className={styles.forgotLink}>Esqueceu a senha?</a>
                    </div>
                    <input type="submit" value="Entrar" className={styles.submitButton} /> 
                </form>
                 <h1>Não tem uma conta? <a className="text-[#FF5252] " href="">Inscreva-se</a></h1>
            </div>
        </div>
    );
}
