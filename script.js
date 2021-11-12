const API_KEY = "7468185853fe8f2f2b17";

const revertCheck = document.querySelector(".form-check-input");

const clearForm = () => {
  document.querySelector("#amount").value = "";
  document.querySelector("#result").value = "";
};

const convertRequest = async (fromCur, toCur) => {
  const baseUrl = "https://free.currconv.com/api/v7/convert";

  const url = `${baseUrl}?apiKey=${API_KEY}&q=${fromCur}_${toCur}`;

  try {
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    throw new Error(error.message);
  }
};

const processResponse = (response, fromAmount, resultContainer) => {
  const results = response.results;
  const rate = results[`${Object.keys(results)[0]}`].val;
  resultContainer.value = (Number(rate) * Number(fromAmount)).toFixed(2);
};

const revertConvert = (e) => {
  if (e.target.checked) {
    document.querySelector("#toCur").value = "USD";
    document.querySelector("#fromCur").value = "RUB";
    document.querySelector("#amount").placeholder = "В рублях";
  } else {
    document.querySelector("#toCur").value = "RUB";
    document.querySelector("#fromCur").value = "USD";
    document.querySelector("#amount").placeholder = "В долларах";
  }
};

revertCheck.addEventListener("change", (e) => {
  clearForm();
  revertConvert(e);
});

document.getElementById("converter").addEventListener("submit", (e) => {
  e.preventDefault();

  let inputs = e.target.elements;
  const fromCur = inputs["fromCur"].value;
  const toCur = inputs["toCur"].value;
  const amount = inputs["amount"].value;

  convertRequest(fromCur, toCur).then((res) =>
    processResponse(res, amount, inputs["result"])
  );
  e.preventDefault();
});
