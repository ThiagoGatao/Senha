let passwordLength = 10;

function adjustLength(change) {
  passwordLength = Math.max(4, passwordLength + change); // mínimo 4
  document.getElementById("length").textContent = passwordLength;
}

function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const symbols = "@#$%&*!?";
  
  let characters = "";
  if (document.getElementById("uppercase").checked) characters += upper;
  if (document.getElementById("lowercase").checked) characters += lower;
  if (document.getElementById("numbers").checked) characters += nums;
  if (document.getElementById("symbols").checked) characters += symbols;

  if (characters.length === 0) return;

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const rand = Math.floor(Math.random() * characters.length);
    password += characters[rand];
  }

  document.getElementById("password").value = password;
  checkStrength(password);
}

function checkStrength(password) {
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@#$%&*!?]/.test(password)) strength++;
  
  const bar = document.querySelector(".bar::after");
  const barElement = document.querySelector(".bar");
  const strengthText = document.getElementById("strengthText");

  const width = (strength / 4) * 100;
  barElement.style.setProperty("--bar-width", `${width}%`);

  const barFill = barElement.querySelector("::after");
  barElement.style.position = "relative";
  barElement.innerHTML = `<div style="width:${width}%; height:100%; background-color:limegreen;"></div>`;

  strengthText.textContent = strength === 4 
    ? "Um computador pode levar até 210976 dias para descobrir essa senha." 
    : "Senha fraca. Considere usar mais combinações.";
}
