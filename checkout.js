// import { loadEnv } from "vite";
// import Stripe from "stripe";

// const env = loadEnv(import.meta.env.MODE, process.cwd(), "");
const stripe = Stripe(
  "pk_test_51PkkRC049w60BdGzklHEttFbjiukybK2Qa1rhm3k0EHxylIljvEo2flHKU3tHb0xUTiJJu8ziJPg2WhEhNibhqaK00zpy2PLRt"
);

document.addEventListener("DOMContentLoaded", async function () {
  const username = sessionStorage.getItem("username");
  const country = sessionStorage.getItem("country");
  const phone = sessionStorage.getItem("phone");
  const email = sessionStorage.getItem("email");

  if (!username || !country || !phone || !email) {
    window.location.href = "main.html";
  }

  await initialize();
});
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch(
      "http://localhost:4242/create-checkout-session",
      {
        method: "POST",
      }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  checkout.mount("#checkout");
}
