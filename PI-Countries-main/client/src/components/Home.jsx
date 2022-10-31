import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../redux/actions";
import Card from './Card';
import Filtrado from "./Filtrado";
import Ordenamiento from "./Ordenamiento";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const countries = useSelector(s => s.countries);

    const [page, setPage] = useState(1);
    const perPage = 10;
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const currentCountries = Array.isArray(countries) ? countries.slice(firstIndex, lastIndex) : 'No hay paises';

    function paginado(n) {
        setPage(n);
    }

    return (
        <div>
            <div>
                <Link to='/activities'><button>Crear actividad turistica</button></Link>
            </div>
            <div>
                <SearchBar/>
                <Filtrado/>
                <Ordenamiento/>
            </div>
            <div>
                <Paginado perPage={perPage} countries={countries.length} paginado={paginado}/>
            </div>
            <div>
                {
                    currentCountries?.length ? 
                    currentCountries?.map(el => {
                        return (
                            <div key={el.cca3}>
                                <Card
                                cca3={el.cca3}
                                flag={el.flag}
                                name={el.name}
                                region={el.region}
                                />
                            </div>
                        );
                    }) : 
                    <h4>No hay paises</h4>
                }
            </div>
        </div>
    );
}