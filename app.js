const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns =document.querySelectorAll(".dropdown select");
const bttn = document.querySelector("form button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg")

window.addEventListener("load",()=>{
    updateExchanegRate();
})

let i=0
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        ///to keep usd and inr as default
        if(select.name==="form" && currCode ==="USD"){
            newOption.selected="selected";
        }
        else if(select.name ==="to"&& currCode==="INR"){
            newOption.selected="selected";
            
        }///

         select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag =(element)=>{
    let countryCode = countryList[element.value];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;

}

bttn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchanegRate();
})

const updateExchanegRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if (amtVal ==="" || amtVal <1) {
        amtVal=1;
        amount.value="1"
    }

    //console.log(fromCurr.value,toCurr.value);
    const URL =`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data=await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal*rate;

    msg.innerText =`${amtVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`

}
