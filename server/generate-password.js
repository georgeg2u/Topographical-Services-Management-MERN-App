const bcrypt = require("bcrypt");

const parolaNoua = "ParolaMeaNoua123@"; // scrii parola nouă
bcrypt.hash(parolaNoua, 12).then(hash => {
  console.log("Hash generat:", hash);
});
