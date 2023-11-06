import React, {useState} from "react";
import styles from '../styles/searchAlbuns.module.css'
import { useRouter } from "next/router";
import {notification} from 'antd'

export default function SearchArtists(){

    const [valueInput, setInput] = useState('')

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({placement, title}) => {
        api.info({
            message: `${title}`,
            description:
                'Este é um campo obrigatório. Informe algum Artista!',
            placement,
        });
    }

    const router = useRouter()
    const navAlbuns = () => {
        if(document.getElementById('searchAlbuns').value){
            router.push({
                pathname: './album',
                query: {artista: document.getElementById('searchAlbuns').value}
            })
        }
        else{
            openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
        }
    }

    const handleChangeSearch = (e) => {
        const inputText = e.target.value

        if (/^[a-zA-Z 0-9 ']+$/.test(inputText) || inputText === '') {
            setInput(inputText)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navAlbuns()
        }
    };

    return(
        <main className={styles.body}>
            <div>
                {contextHolder}
                <div className={styles.content}>
                    <h1 className="text-center py-10">Pesquise por Álbuns</h1>
                    <div class='form-floating'>
                        <input 
                            type="text" 
                            id="searchAlbuns" 
                            class="form-control shadow-none" 
                            required
                            value={valueInput}
                            placeholder="TBT WS" 
                            minlength="1" 
                            maxlength="26"
                            onChange={handleChangeSearch}
                            onKeyPress={handleKeyPress}
                        >
                        </input>
                        <label for="searchArtists">Digite o Nome do Álbum</label>
                    </div>
                    <div className={styles.instrucoes}>
                        <p>Atenção: As pesquisas devem ser feitas sem o uso de acentos ou caracteres especiais!</p>
                    </div>
                </div>
                <button className={styles.buttonSearch} onClick={navAlbuns}>
                    <span class="material-symbols-outlined">search</span>
                </button>
            </div>
        </main>
    )
}