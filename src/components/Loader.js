import React from 'react'
import { Bars } from 'react-loader-spinner'

const Loader = () => {
    return (
        // <Rings height="50" width="50" color="red" ariaLabel="loading" />
        <Bars height="50" width="50" color="green" ariaLabel="loading" />
        //* <Circles height="50" width="50" color="blue" ariaLabel="loading" /> 
    )
}

export default Loader