import styles from './css/nav.module.css';

export function Nav() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <img src="/logo.png" alt=""/>
          <h1>avaHelper</h1>
        </div>
  
        <div className={styles.right}>
            <i className='bx bx-globe'></i>
          <button className={styles.loginButton}>
            <h1>Login</h1>
          </button>
        </div>
      </nav>
    );
  }