import React from "react";

export default function Card({flag, name, region}) {
    return (
        <div>
            <img src={flag} alt="" />
            <h2>{name}</h2>
            <h4>{region}</h4>
        </div>
    );
}
