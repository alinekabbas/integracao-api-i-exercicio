import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]


export default function Musicas(props) {

    const [musicas, setMusicas] = useState([])
    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [url, setUrl]= useState("")

    const novasMusicas = ()=>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, {
            headers:{
                Authorization: "aline-kabbas-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta.data.result.tracks)
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    useEffect(()=>{
        novasMusicas()
    }, [])

    const adicionarMusicas = ()=>{
        const body = {
            name: name,
            artist: artist,
            url: url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, body, {
            headers:{
                Authorization: "aline-kabbas-ammal"
            }
        })
        .then((resposta)=>{
            novasMusicas()
            console.log(resposta)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    const deletarMusica = (id)=>{
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks/${id}`, {
            headers:{
                Authorization: "aline-kabbas-ammal"
            }
        })
        .then((resposta)=>{
            novasMusicas()
            console.log(resposta)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>deletarMusica(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica 
                placeholder="artista"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                />
                <InputMusica 
                placeholder="musica" 
                value={artist}
                onChange={(e)=>setArtist(e.target.value)} 
                />
                <InputMusica 
                placeholder="url" 
                value={url}
                onChange={(e)=>setUrl(e.target.value)} 
                />
                <Botao onClick={adicionarMusicas}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

