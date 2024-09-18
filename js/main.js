const steps = document.querySelectorAll(".step");

const stepOne = document.querySelector(".step-1");
const stepTwo = document.querySelector(".step-2");
const stepThree = document.querySelector(".step-3");
const stepFour = document.querySelector(".step-4");
const stepFive = document.querySelector(".thank-you");
let stepIndex = 0;

const goBackBtns = document.querySelectorAll(".go-back-btn");
const stepFourForm = document.querySelector(".step-4 form");

function goToNextStep(currentStep, nextStep) {
  currentStep.style.display = "none";
  nextStep.style.display = "block";
  steps[stepIndex].classList.remove("active");
  steps[stepIndex + 1].classList.add("active");
  stepIndex++;
}

function goToPreviousStep(currentStep, previousStep) {
  currentStep.style.display = "none";
  previousStep.style.display = "block";
  steps[stepIndex].classList.remove("active");
  steps[stepIndex - 1].classList.add("active");
  stepIndex--;
}

function confirm() {
  stepFour.style.display = "none";
  stepFive.style.display = "flex";
  steps[stepIndex].classList.remove("active");
}

/* ==========STEP1================ */
const stepOneForm = document.querySelector(".step-1 form");

const stepOneInputs = document.querySelectorAll(".inp");
function verifyPersonalInfo() {
  var valid = true;
  stepOneInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      input.parentElement.querySelector(".error-msg").style.display = "block";
      valid = false;
    } else {
      input.classList.remove("error");
      input.parentElement.querySelector(".error-msg").style.display = "none";
    }
  });
  return valid;
}

stepOneForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (verifyPersonalInfo()) {
    goToNextStep(stepOne, stepTwo);
  }
});

/* ================STEP2================ */

const stepTwoForm = document.querySelector(".step-2 form");
const plans = document.querySelectorAll(".plan");
const subBtn = document.querySelector(".sub-btn");
const subscriptionEl = document.querySelectorAll(".subscription h2");
const monthly = subscriptionEl[0];
const yearly = subscriptionEl[1];
const yearlySubEls = document.querySelectorAll(".yearly-sub");
const monthlySubEls = document.querySelectorAll(".monthly-sub");

const planSelected = {
  name: "Arcade",
  price: "9",
};

function yearlySubscription() {
  subBtn.style.marginLeft = "1rem";
  yearlySubEls.forEach((element) => {
    element.style.display = "block";
  });
  monthlySubEls.forEach((element) => {
    element.style.display = "none";
  });
}

function monthlySubscription() {
  subBtn.style.marginLeft = "0";
  monthlySubEls.forEach((element) => {
    element.style.display = "block";
  });
  yearlySubEls.forEach((element) => {
    element.style.display = "none";
  });
}

function getThePlan() {
  plans.forEach((plan) => {
    if (plan.classList.contains("active")) {
      const planName = plan.querySelector(".plan-name").textContent;
      planSelected.name = planName;
      if (yearly.classList.contains("active")) {
        const subEL = plan.querySelector(".yearly-sub").textContent;
        const price = subEL.match(/\d/g);
        planSelected.price = price.join("");
      } else {
        const subEL = plan.querySelector(".monthly-sub").textContent;
        const price = subEL.match(/\d/g);
        planSelected.price = price.join("");
      }
    }
  });
}

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      plan.classList.remove("active");
    });
    plan.classList.add("active");
    getThePlan();
  });
});

subBtn.addEventListener("click", () => {
  yearly.classList.toggle("active");
  monthly.classList.toggle("active");
  if (yearly.classList.contains("active")) {
    yearlySubscription();
  } else {
    monthlySubscription();
  }
  getThePlan();
});

goBackBtns[0].addEventListener("click", () => {
  goToPreviousStep(stepTwo, stepOne);
});

stepTwoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateSummary();
  goToNextStep(stepTwo, stepThree);
});

/* =================STEP3==================== */

const stepThreeForm = document.querySelector(".step-3 form");
const addOns = document.querySelectorAll(".add-on");
let addOnsSelected = [];

function getAddOns(addOn) {
  const addOnName = addOn.querySelector(".add-on-name").textContent;
  let addOnPriceEl = "";
  if (addOn.classList.contains("active")) {
    if (yearly.classList.contains("active")) {
      addOnPriceEl = addOn.querySelector(".yearly-sub").textContent;
      const addOnPrice = addOnPriceEl.match(/\d/g);
      addOnsSelected.push({
        name: addOnName,
        price: addOnPrice.join(""),
      });
    } else {
      addOnPriceEl = addOn.querySelector(".monthly-sub").textContent;
      const addOnPrice = addOnPriceEl.match(/\d/g);
      addOnsSelected.push({
        name: addOnName,
        price: addOnPrice.join(""),
      });
    }
  } else {
    addOnsSelected = addOnsSelected.filter((addOn) => {
      return addOn.name !== addOnName;
    });
  }
}

addOns.forEach((addOn) => {
  addOn.addEventListener("click", () => {
    addOn.classList.toggle("active");
    const checked = addOn.querySelector("input");
    checked.checked = !checked.checked;
  });
});

goBackBtns[1].addEventListener("click", () => {
  goToPreviousStep(stepThree, stepTwo);
});

stepThreeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOns.forEach((addOn) => {
    getAddOns(addOn);
  });
  updateSummary();
  goToNextStep(stepThree, stepFour);
});

/* =====================STEP4====================== */

const summary = document.querySelector(".summary");
const planSelectedEl = summary.querySelector(".plan-selected h2");
const planSelectedPriceEl = summary.querySelector(".plan-selected span");
const changePlan = summary.querySelector(".change-plan");
const addOnsSelectedEl = summary.querySelector(".addOns-selected");
const totalEl = document.querySelector(".total div p");
const totalPriceEl = document.querySelector(".total span");
let total = 0;

function clearSummary() {
  planSelectedEl.textContent = ``;
  planSelectedPriceEl.textContent = ``;
  addOnsSelected = [];
  total = 0;
  addOnsSelectedEl.innerHTML = ``;
  totalEl.textContent = ``;

  totalPriceEl.textContent = ``;
}

function updateSummary() {
  planSelectedEl.textContent = `${planSelected.name} (${
    yearly.classList.contains("active") ? "yearly" : "monthly"
  })`;
  planSelectedPriceEl.textContent = `$${planSelected.price}/${
    yearly.classList.contains("active") ? "yr" : "mo"
  }`;

  addOnsSelected.forEach((addOn) => {
    const addOnEl = `<div class="choice flex">
                    <div>
                      <p class="muted-text">${addOn.name}</p>
                    </div>
                    <span>+$${addOn.price}/${
      yearly.classList.contains("active") ? "yr" : "mo"
    } </span>
                  </div>`;

    addOnsSelectedEl.innerHTML += addOnEl;
    total += parseInt(addOn.price);
  });

  totalEl.textContent = `Total(${
    yearly.classList.contains("active") ? "yearly" : "monthly"
  })`;

  totalPriceEl.textContent = `+$${total + parseInt(planSelected.price)}/${
    yearly.classList.contains("active") ? "yr" : "mo"
  }`;
}

changePlan.addEventListener("click", () => {
  clearSummary();
  stepIndex -= 2;
  stepFour.style.display = "none";
  stepTwo.style.display = "block";
  steps[1].classList.add("active");
  steps[3].classList.remove("active");
});

goBackBtns[2].addEventListener("click", () => {
  goToPreviousStep(stepFour, stepThree);
  clearSummary();
});

stepFourForm.addEventListener("submit", (e) => {
  e.preventDefault();
  confirm();
});
