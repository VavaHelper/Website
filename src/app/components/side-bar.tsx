import styles from './css/sidebar.module.css';

export function SideBar() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a href="/home">
            <button><img src="/icons/home.png" alt="Home" /></button>
          </a>
        </li>
        <li>
          <a href="/movi">
            <button><img src="/icons/movie.png" alt="Movie" /></button>
          </a>
        </li>
        <li>
          <a href="/pixel">
            <button><img src="/icons/pixel.png" alt="Pixel" /></button>
          </a>
        </li>
        <li>
          <a href="/skills">
            <button><img src="/icons/skills.png" alt="Skills" /></button>
          </a>
        </li>
      </ul>
    </div>
  );
}
