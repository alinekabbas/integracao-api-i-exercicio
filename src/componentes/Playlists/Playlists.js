import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]


function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const novaPlaylist = () =>{
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers:{
                Authorization: "aline-kabbas-ammal"
            }
        })
        .then((resposta)=>{
            setPlaylists(resposta.data.result.list)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }
    useEffect(()=>{
        novaPlaylist()
    }, [])
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas 
                key={playlist.id} 
                playlist={playlist}
                id={playlist.id}
                />
            })}

        </div>
    );
}

export default Playlists;
