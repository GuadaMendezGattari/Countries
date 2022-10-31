import React, {useEffect} from "react";
import Card from "./Card";
import {getAllCountries} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

export default function Cards() {
    const dispacth = useDispatch();
    useEffect(() => {
        dispacth(getAllCountries());
    }, [dispacth]);
    const countries = useSelector(s => s.countries);
    return(
        <div>
            {
                countries.length > 0 ? 
                countries.map(el => {
                    return (
                        <div>
                            <Link to={`/countries/${el.cca3}`}>
                                <Card
                                key={el.cca3}
                                flag={el.flag}
                                name={el.name}
                                region={el.region}
                                />
                            </Link>
                        </div>
                    );
                }) : 
                <h4>No hay paises</h4>
            }
        </div>
    );
}