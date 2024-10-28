import React, { useEffect, useState } from 'react'
import CountryCards from './CountryCards';
import logo from "../assets/loader.gif"


const BannerSection = () => {

    const [countries, setCountries] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [region, setRegion] = useState("")
    const [subRegion, setSubRegion] = useState("")
    const [sortBasedOn, setSortBasedOn] = useState("")
    const [order, setOrder] = useState("");
    const [loader, setLoader] = useState(false);

    let regionData = [];
    let subRegionData = [];

    regionData = countries.reduce((acc, country) => {
        if (!acc.includes(country.region)) {
            acc.push(country.region)
        }
        return acc;
    }, [])

    subRegionData = countries.reduce((acc, country) => {
        if (!acc.includes(country.subregion) && region === country.region) {
            acc.push(country.subregion);
        }
        return acc;
    }, [])

    // console.log(subRegionData)

    const getCountries = async () => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/all`)
            const data = await res.json();
            setCountries(data);
        } catch (error) {
            throw (error)
        }
        setLoader(true)
    }
    useEffect(() => {

        setTimeout(() => {
            getCountries();
        }, 800)

    }, [])


    const sortedHandler = (e) => {
        setSortBasedOn(e.target.value)
        setOrder("")
    }

    const searchInputHandler = (e) => {
        setSearchInput(e.target.value);
    }


    let filteredData = countries.filter((country) => {
        return country === "" || country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    }).filter((country) => {
        return region === "" || country.region === region
    }).filter((country) => {
        return subRegion === "" || country.subregion === subRegion
    })
    if (sortBasedOn === "population") {
        if (order === "ascending") {
            filteredData.sort((a, b) => a.population - b.population)
        } else if (order === "descending") {
            filteredData.sort((a, b) => b.population - a.population)
        }
    } else if (sortBasedOn === "area") {
        if (order === "ascending") {
            filteredData.sort((a, b) => a.area - b.area)
        } else if (order === "descending") {
            filteredData.sort((a, b) => b.area - a.area)
        }
    }




    return (
        <div>
            <div className='flex justify-between items-center mx-10'>
                <div className='mt-2 relative flex items-center justify-start'>
                    <i class="fa-solid fa-magnifying-glass absolute pl-2 text-gray-500"></i>
                    <input onChange={searchInputHandler} className='region-filter rounded-md shadow-lg px-10 py-3 outline-none' type="text" placeholder='Search for a country' />
                </div>
                <div className='flex items-center mt-1 md:flex'>
                    <div>
                        <select onChange={e => setRegion(e.target.value)} className='region-filter rounded-md shadow-lg py-3 px-4 outline-none' name="" id="">
                            <option value="">Filter by Region</option>
                            {
                                regionData.map((country, index) => {
                                    return <option key={index}>{country}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <select onChange={e => setSubRegion(e.target.value)} className='region-filter rounded-md py-3 px-4 shadow-lg outline-none' name="" id="">
                            <option value="">Filter by subRegion</option>
                            {
                                subRegionData.map((subRegion, index) => {
                                    return <option key={index}>{subRegion}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <select onChange={sortedHandler} name="" id="" className='region-filter rounded-md py-3 px-4 shadow-lg outline-none'>
                            <option value="">Sort By</option>
                            <option value="population">Sort by Population</option>
                            <option value="area">Sort by Area</option>
                        </select>
                    </div>
                    <div>
                        <select onChange={e => setOrder(e.target.value)} value={order} name="" id="" className='region-filter rounded-md py-3 px-4 shadow-lg outline-none'>
                            <option value="">Sort by</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-wrap gap-20 justify-center items-center mt-10'>
                {loader ? (filteredData.map((country) => {
                    return (
                        <div className='flex-wrap'>
                            <CountryCards
                                flags={country.flags.png}
                                name={country.name.common}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                                area={country.area}
                                cca3={country.cca3}

                            />
                        </div>

                    )
                })) : (<img src={logo} />)}
            </div>
        </div>
    )
}

export default BannerSection