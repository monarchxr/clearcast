import React from "react";

function Footer(){
    let currentYear = new Date().getFullYear()
    
    return(
        <div>
            <p>© {currentYear} ClearCast - a simple react based project made by Raunak Jais</p>
        </div>
    )
}

export default Footer;