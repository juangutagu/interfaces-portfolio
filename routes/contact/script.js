function enviarMail() {
  console.log("EMAIL");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  emailjs.send("service_1", "template_interfaces", templateParams).then(
    function (response) {
      console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
    },
    function (err) {
      console.log("FAILED. error=", err);
    }
  );
}
