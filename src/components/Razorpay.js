import React from 'react'
import axios from 'axios'
import { Currency } from 'lucide-react';
import { orderPayment } from '../utils/userApi';

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;

        // Correctly assigning event handlers
        script.onload = () => {
            resolve(true);
        };

        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

export const createRazorpay = (amount, navigate) => {
    let data = JSON.stringify({
        amount: amount * 100,
        currency: "INR"

    })
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: orderPayment,
        headers: {
            'Content-Type': "application/json"
        },
        data: data
    }
    axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data))
        handleRazorpayScreen(response.data.amount, navigate)
    }).catch((e) => {
        console.log(e);
    })
}
const handleRazorpayScreen = async (amount, navigate) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");
    if (!res) {
        alert("some error at razorpay screen")
        return;
    }
    const options = {
        key: 'rzp_test_3C201ifWQTPlPB',
        amount: amount,
        currency: "INR",
        name: "Style-me",
        description: "payment to style-me",
        handler: function (response) {
            // setResponseId(response.razorpay_payment_id),

            navigate('/')
        },
        prefill: {
            name: "Herish",
            email: "herishgarg@gmail.com"
        },
        theme: {
            color: "#000"
        }
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open()
}
const fetchPayment = async (e) => {
    e.preventDefault();
    let passwordId = e.target.paymentId.value;
    await axios.get(`http://localhost:4444/api/auth/payment/${passwordId}`).then((response) => {
        console.log(response.data);
        // setResponseState(response.data)
    }).catch((e) => {
        console.log(e);
    })
}