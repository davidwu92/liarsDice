import React, {useState, useEffect} from 'react'

const TurnOptions = ({roundNum, users, currentCall, myQuantity, setMyQuantity, myValue, setMyValue, makeCall, callLiar}) => {
  const [quantities, setQuantities] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
  const [values, setValues] = useState(["Two", "Three", "Four", "Five", "Six"])
  
  useEffect(()=>{
    //triggers when roundNum changes; updates callable quantities (limited by # of die in all hands.)
    console.log("TurnOptions useEffect: roundNum changed.")
    let totalDie = 0
    if(users){
      users.forEach(user=>{
        if(user.hand){totalDie+=user.hand.length}
      })
    }
    let possibleQuantities = []
    let i = 1
    while (i<=totalDie){
      possibleQuantities.push(i)
      i++
    }
    setQuantities(possibleQuantities)
  }, [roundNum])

  return(
    <>
      <div className="green lighten-1">
        <div class="input-field">
          <select className="browser-default green lighten-1 white-text" 
                  style={{width: "35%", display:"inline"}}
                  onChange={(event)=> {setMyQuantity(JSON.parse(event.target.value))}}>
            <option value={0} disabled selected>Call a Quantity</option>
            {currentCall.length ? quantities.map(quantity=>(
                quantity < currentCall[0] ? <option value={quantity} disabled>{quantity}</option> 
                : <option value={quantity}>{quantity}</option> 
                ))
              :
              quantities.map(quantity=>(<option value={quantity}>{quantity}</option>))
            }
          </select>
          <span> </span>
          <select className="browser-default green lighten-1 white-text"
                  style={{width: "35%", display:"inline"}}
                  onChange={(event)=> setMyValue(event.target.value)}>
            <option value="" disabled selected>Dice Value</option>
            {currentCall.length ?
              values.map((diceValue, index)=>(
                (index < values.indexOf(currentCall[1]) || index > values.indexOf(currentCall[1])+2) ? <option value={diceValue} disabled>{diceValue}</option>
                  :<option value={diceValue}>{diceValue}</option>))
              :
              values.map((diceValue, index)=>(
                (index>2) ? <option value={diceValue} disabled>{diceValue}</option> 
                  :<option value={diceValue}>{diceValue}</option>))
            }
            {/* <option value={"Twos"}>Twos</option>
            <option value={"Threes"}>Threes</option>
            <option value={"Fours"}>Fours</option>
            <option value={"Fives"}>Fives</option>
            <option value={"Sixes"}>Sixes</option> */}
          </select>
          <button className="btn green darken-1 right" onClick={makeCall}>Make Call!</button>
        </div>
      </div>
      <button className="btn red darken-1" onClick={callLiar}>Call Liar!</button>
    </>
  )
}
export default TurnOptions