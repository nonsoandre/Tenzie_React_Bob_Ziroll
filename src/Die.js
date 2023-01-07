export default function Die(props){

    return(
        <div onClick={props.holdDice} className={ `die-face ${props.isHeld ? "lightGreen" : ""}` }>
            <h2 className = "die-num">
                {props.value} 
            </h2>
        </div>
    )
}