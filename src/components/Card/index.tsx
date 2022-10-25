import './styles.css';

export type CardProps = { //tipagem
    name: string;
    time: string;
}
export function Card(props: CardProps){ {/* passando propriedade para cada card utilizando props */}
    return(
        <div className="card">
            <strong>{props.name}</strong> {/* propriedade name atribuida*/}
            <small>{props.time}</small> {/* propriedade time atribuida*/}
        </div>
    )
}