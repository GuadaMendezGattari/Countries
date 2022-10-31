import React from "react";
import { Link } from "react-router-dom";

export default function Card({cca3, flag, name, region}) {
    return (
        <div>
            <img src={flag} alt="" />
            <Link to={`/countries/${cca3}`}><h2>{name}</h2></Link>
            <h4>{region}</h4>
        </div>
    );
}
