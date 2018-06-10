import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
        </div>
    )
}

const Osa = (props) => <p>{props.nimi} {props.tehtavia}</p>

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = ({ kurssi }) => {
    const osat = kurssi.osat
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}
const Yhteensa = ({ kurssi }) => {
    const maara = kurssi.osat.reduce((sum, index) => sum + index.tehtavia, 0)

    return (
        <p>yhteensä {maara} tehtävää</p>
    )
}

export default Kurssi