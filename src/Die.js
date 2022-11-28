export default function Die(props){

    return(
        <div className={ `die-face ${props.isHeld ? "lightGreen" : ""}` }>
            <h2 className = "die-num"
                onClick={props.holdDice}>
                {props.value} 
            </h2>
        </div>
    )
}