//initial state
let currency = [ 2000, 500, 200, 100 ];
let denominations = [0,0,0,0];
let totalAmout = 0;
let tbody = document.getElementById('tableBody');

let withdraw = document.getElementById("withdraw");
withdraw.addEventListener("click",withdrawMoney)

//show table
showTable(currency, denominations);

function depositAmount(eve){
  console.log("eve")
  let logData = {};
  for(let i = 0; i< tbody.children.length -1 ; i++){
    c = tbody.children[i];
    denominations[i] += Number(c.children[3].children[0].value);
    logData[c.children[0].innerHTML] =  Number(c.children[3].children[0].value);
  } 
 
  showTable(currency, denominations);
  console.log("logData",logData)
  showLogs("deposit", logData) 
}

function getTotal(){
  let total = 0;
  for(let j=0; j < currency.length; j++){
    total += currency[j] * denominations[j];
  }
  return total;
}

//render the table
function showTable(currArr, denArr){
  tbody.innerHTML = "";
  for(let i =0; i < currArr.length; i++){
    let row = document.createElement("tr");
    let curr = document.createElement("td")
    curr.innerHTML = currArr[i];
    let denm = document.createElement("td")
    denm.innerHTML = denArr[i];
    let line = document.createElement("span")
    line.innerHTML = " | "
    let inp = document.createElement("td")
    inp.appendChild(document.createElement("input"));
    row.appendChild(curr);
    row.appendChild(denm);
    row.appendChild(line);
    row.appendChild(inp);
    tbody.appendChild(row)
  }
  let totalDeposit = document.createElement("tr");
  let head = document.createElement("td");
  head.innerHTML = "TOTAL"
  let total = document.createElement("td");
  total.innerHTML = getTotal();
  let sp = document.createElement("span");
  sp.innerHTML =" | ";
  let btnDiv = document.createElement("td");
  let btn = document.createElement("button");
  btn.classList.add("btn","btn-primary");
  btn.id = "deposit"
  btn.innerHTML = "Deposit"
  btn.addEventListener("click",depositAmount )
  btnDiv.appendChild(btn);
  totalDeposit.appendChild(head);
  totalDeposit.appendChild(total);
  totalDeposit.appendChild(sp);
  totalDeposit.appendChild(btnDiv);
  tbody.appendChild(totalDeposit);
}

function showLogs(type, data){
    let logContainer = document.getElementById("logs"); 
    let alert = document.createElement("div");
    let date = new Date();
    let br = document.createElement("br");
    let dateDiv = document.createElement("small");
    dateDiv.innerHTML = date;
    console.log("data", data)
    if(type == "deposit"){
      alert.classList.add("alert", "alert-info");
      alert.innerHTML = "Deposit :   2000: "+ data["2000"]+ " 500: "+ data["500"]+ " 200:  "+ data['200']+ ' 100: '+data["100"];
      alert.appendChild(br);
      alert.appendChild(dateDiv);
      logContainer.prepend(alert);
    }else if(type == "outofbound"){
      alert.classList.add("alert", "alert-danger");
      alert.innerHTML = "can not withdraw";
      alert.appendChild(br);
      alert.appendChild(dateDiv);
      logContainer.prepend(alert);
    }else if(type == "withdraw"){
      alert.classList.add("alert", "alert-success");
      alert.innerHTML = "withdraw :   2000: "+(data[2000] ?  data[2000] : 0) + " 500 :"+(data[500] ?  data[500] : 0) + " 200 :"+(data[200] ?  data[200] : 0) + " 100 :"+(data[100] ?  data[100] : 0);
      alert.appendChild(br);
      alert.appendChild(dateDiv);
      logContainer.prepend(alert);
    }
}

function withdrawMoney(){
  let amt = Number(document.getElementById("withdrawAmt").value);
  let result = checkBal(amt);
  console.log("result", result)
  if(result == -1){
    showLogs("outofbound", null)
  }else{
    console.log("result", result)
    showTable(currency, denominations);
    showLogs("withdraw", result)
  }
}

//MAIN LOGIC FOR CALCULATING DOMINATIONS
function checkBal(amount){
  let result = {};
  let remaining = amount;
  for(let i=0; i < currency.length; i++){
    let newDenomination = denominations;
    if(remaining >= currency[i]){
      console.log("inside")
        let required = Math.floor(remaining/currency[i]);
        if( required <= newDenomination[i]){
          newDenomination[i] = newDenomination[i] - required;
          remaining = remaining % ( currency[i] * required );
          result[currency[i]] = required;
          if(remaining == 0){
            denominations = newDenomination;
            return result;
          }
        }else continue; 
    }
  }

  return -1;
}