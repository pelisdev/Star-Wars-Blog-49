import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

 const Card = ({uid, name, linkPath, buttonText}) => {
    const { store, actions } = useContext(Context);

    //needs favorite add toggle

    const [favorite, setFavorite] = useState (false);

    //needs use effect
    useEffect (() => {
        const itemInFavorites = store.favorites.some ((favorite) => favorite.uid === uid && favorite.linkPath === linkPath);
        setFavorite(itemInFavorites);

    }, [store.favorites, uid, linkPath] );


    //how to link the actions properly
    const handleFavorite = (uid, name, linkPath, buttonText) => {

        const newFavorite =!favorite;
        setFavorite (newFavorite)
        if (newFavorite) {
            actions.addFavorite ({uid, name, linkPath, buttonText});

        } else {
            actions.removeFavorite ({uid, linkPath})
        }
    
    };

    return (
        <div className="col-md-4 p-4 m-3">
            <div className="card border" id="cardBorder" >
                <img src="https://placehold.co/400x200" className="card-img-top" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h5 className="card-title text-dark font-weight-bold mb-4"> {name} </h5>
                    </div>
                    <div className="text-center"> 
                        <div className="d-flex justify-content-between mb-2">
                            <Link to={`/details/${linkPath}/${uid}`} className="btn btn-success" >
                                {buttonText}
                            </Link>
                            <button onClick={()=>handleFavorite(uid, name, linkPath, buttonText)} className={`btn btn-dark  &{favorite ? 'btn btn-light' : 'btn btn-dark' }`} > 
                            {favorite? 'Eliminar de Favoritos' : 'Agregar a favoritos' } </button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );



};
export default Card;