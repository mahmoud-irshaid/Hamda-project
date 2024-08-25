async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const response = await fetch(`/session-status?session_id=${sessionId}`);
  const session = await response.json();
  const clientUrl = import.meta.env.CLIENT_URL;

  if (session.status == "open") {
    window.replace(`${clientUrl}/checkout.html`);
  } else if (session.status == "complete") {
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("customer-email").textContent =
      session.customer_email;

    // Extract user info from session storage
    const username = sessionStorage.getItem("username");
    const country = sessionStorage.getItem("country");
    const phone = sessionStorage.getItem("phone");
    const email = sessionStorage.getItem("email");

    // Prepare data to be sent to the server
    const userInfo = {
      username: username,
      country: country,
      phone: phone,
      email: email,
      stripeSessionId: sessionId,
      stripeCustomerEmail: session.customer_email,
    };

    // Send user info to the server to save in the database
    await fetch("/save-user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }
}

initialize();
