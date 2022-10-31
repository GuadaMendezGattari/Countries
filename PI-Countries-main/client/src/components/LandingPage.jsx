import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <Link to='/home'>
                <button>Ir al home</button>
            </Link>
        </div>
    );
}