import React from "react";

export default function Paginado({perPage, countries, paginado}) {
    const numeros = [];
    for(let i = 1; i <= Math.ceil(countries / perPage); i++) {
        numeros.push(i);
    }
    return (
        <div>
            <nav>
                {
                    numeros?.length > 0 &&
                    numeros?.map(el => {
                        return (
                            <span key={el}>
                                <button onClick={() => paginado(el)}>{el}</button>
                            </span>
                        );
                    }) 
                }
            </nav>
        </div>
    );
}