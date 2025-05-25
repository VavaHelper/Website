// TODO: Igão e Matheus -> Iniciar tela de Skills

import styles from './skills.module.css'
import { Nav } from '@components/nav';
import { SideBar } from '@components/side-bar';

export default function Skills() {
    return (
        <div className={styles.global}>
            <Nav/>
            <SideBar/>
            <div className={styles.containersearch}>
                <h1 className='text-[#FF5252]'>
                    <span className={styles.title}> Agents </span>
                </h1>

                <span className= {styles.line}></span>
                
                <p className={`py-4 ${styles.description}`}>
                    Explore agent abilities, lineups and strategies
                </p>

                <div className={styles.filter}>
                    <button className={styles.button} type="button">All</button>
                    <button className={styles.button} type="button">Duelists</button>
                    <button className={styles.button} type="button">Initiators</button>
                    <button className={styles.button} type="button">Controllers</button>
                    <button className={styles.button} type="button">Sentinels</button>
                </div>

                {/* aqui: wrapper de grid */}
                <div className={styles.boxGrid}>
                    <div className={styles.card}>
                        <div className={styles.box}/>
                        <h1 className={styles.boxTitle}>Iso</h1>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.box}/>
                        <h1 className={styles.boxTitle}>Jett</h1>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.box}/>
                        <h1 className={styles.boxTitle}>Sova</h1>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.box}/>
                        <h1 className={styles.boxTitle}>Reyna</h1>
                    </div>
                </div>
                
            </div>
        </div>
    );
}