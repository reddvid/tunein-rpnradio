var obj;
var selectedObj;

$("#stations").on("change", function (e) {
  var vs = this.selectedIndex;
  if (vs != 0) {
  }
});
console.clear();

async function fetchApi() {
  await fetch("http://localhost:8000/stations/")
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      //  console.log('Success:', JSON.stringify(response));
      obj = JSON.parse(JSON.stringify(response));
    });

  return obj;
}

fetchApi();

function loadDetails(i) {
  var so = obj[i];
  console.log(so);
  var details = document.getElementById("details");
  var textNode = document.createTextNode(
    `${so.callsign.toUpperCase()} ${so.frequency}KHz ${capFirstLetter(so.name)}`
  );
  details.appendChild(textNode);
}

function capFirstLetter(i) {
  x = i.charAt(0).toUpperCase() + i.slice(1);
  return x;
}
