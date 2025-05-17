// TODO: Igão e Matheus -> Iniciar tela de Skills

import styles from './skills.module.css'
import { Nav } from '../components/nav';
import { SideBar } from '../components/side-bar';

export default function Skills() {
    return (
        <div className={styles.global}>
            <Nav/>
            <SideBar/>
            <div className={styles.containersearch}>
                <h1>Agents</h1>
                <p className={styles.description}>Explore agent abilities, lineups and strategies</p>
                <div className={styles.filter}>
                    <button className={styles.button} type="button">All</button>
                    <button className={styles.button} type="button">Duelists</button>
                    <button className={styles.button} type="button">Initiators</button>
                    <button className={styles.button} type="button">Controllers</button>
                    <button className={styles.button} type="button">Sentinels</button>
                </div>
            </div>
        </div>
    );
}