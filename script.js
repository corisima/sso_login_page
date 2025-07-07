document.getElementById("public_key").value =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn52yCiEdICKSerBx+hdfzIzyF+9KXQBlXT54+AdS1xvY4LaFOlUEdlQDuKLjb0x6A2xIBOOE9b1aqVOrw6DYfM3eKH07pUX7wuOM/BoPHlkoIPBJyqGSiwlt2dMpRTpRKs5kJE9Z7LncLGiips1F+GvvP3c83W79lp88JBU31OIkdiLRuYgOySEruPVX0Ck0Wi1KZ5VN0h/8aVgAbKhDrN/BR0x6INqHipRLi5Aq/YW2E4bGe099F6yL1jGfqmas1181Ojtf0Jog2FLNg0Ia6BxNLHQIOtDVslbwehewDu7wbVKcz/jIPpiDckewAHKbncGhzWs/ofQQlHCGsnEF9wIDAQAB";

var ssoURL;

function access() {
  window.open(ssoURL, "_blank");
}

function generate() {
  var data =
    "EA=" +
    document.getElementById("email").value +
    ";CO=" +
    document.getElementById("country").value +
    ";FN=" +
    document.getElementById("fname").value +
    ";LN=" +
    document.getElementById("lname").value +
    ";TS=" +
    new Date().getTime();

  var publicKey = document.getElementById("public_key").value;

  var jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  var encryptedData = jsEncrypt.encrypt(data);

  if (encryptedData) {
    var secretByteArray = CryptoJS.enc.Base64.parse(publicKey);
    var hash = CryptoJS.HmacSHA256(data, secretByteArray);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    var encryptedAndEncodedData = encodeURIComponent(encryptedData.toString());
    var encodedHash = encodeURIComponent(hashInBase64);

    ssoURL =
      document.getElementById("endpoint").value +
      "?reference=" +
      document.getElementById("reference").value +
      "&user_data=" +
      encryptedAndEncodedData +
      "&hash=" +
      encodedHash;

    document.getElementById("url").innerHTML = ssoURL;
  } else {
    document.getElementById("error").innerHTML = "check console for error";
  }
}
