import axios from "axios";
import logo from "../../assests/jarvis.svg";
import API from "../api/api-urls";

const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment = async (orderDetails) => {
  try {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    const {
      data: { order },
    } = await axios.post(API.CHECKOUT, {
      orderDetails,
    });

    const options = {
      key: "rzp_test_TCLS3zM72WHGDt",
      amount: order.amount.toString(),
      currency: order.currency,
      name: "Jarvis Corp.",
      description: "Demo Transaction",
      image: logo,
      order_id: order.id,
      handler: async function (response) {
        alert("Payment Successful");
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Jarvis Corp. HQ",
      },
      theme: {
        color: "#61dafb",
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.log(err.response);
  }
};
