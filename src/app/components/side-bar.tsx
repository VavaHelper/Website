import styles from './css/sidebar.module.css';

export function SideBar() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a href="/home">
            <button>
              <i 
              className="bx bx-home"
              style={{ color: '#fff', fontSize: '21px', cursor: 'pointer' }}
              ></i>
            </button>
          </a>
        </li>
        <li>
          <a href="/movi">
            <button>
              <i 
              className="bx bx-run"
              style={{ color: '#fff', fontSize: '21px', cursor: 'pointer' }}
              ></i>
            </button>
          </a>
        </li>
        <li>
          <a href="/pixel">
            <button>
              <i 
              className="bx bx-star"
              style={{ color: '#fff', fontSize: '21px', cursor: 'pointer' }}
              ></i>
            </button>
          </a>
        </li>
        <li>
          <a href="/skills">
            <button>
              <i 
              className="bx bx-glasses-alt"
              style={{ color: '#fff', fontSize: '21px', cursor: 'pointer' }}
              ></i>
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
}
