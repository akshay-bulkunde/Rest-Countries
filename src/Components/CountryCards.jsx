import React from 'react'
import { Link } from 'react-router-dom'

const CountryCards = ({ flags, name, population, capital, region, area,cca3 }) => {
    return (
        <Link className='flex justify-start flex-col shadow-md cursor-pointer card' to={`/country/${cca3}`}>
            <img className='w-[20rem] h-[13rem] ' src={flags} alt="" />
            <div className='p-6'>
                <p> <strong>{name}</strong></p>
                <p><strong>Population:</strong> {(population).toLocaleString()}</p>
                <p><strong>Region:</strong> {region}</p>
                <p><strong>Capital:</strong> {capital}</p>
                <p><strong>Area:</strong> {(area).toLocaleString()} km2</p>
            </div>
        </Link>
    )
}

export default CountryCards