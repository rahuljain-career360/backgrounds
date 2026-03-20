// Aapka current code Paytm JS Checkout (Overlay) use karne ki koshish kar raha hai, lekin jo API response aapne dikhaya hai (Paytm URL aur Form Data ke saath), wo Redirect Flow (Standard Checkout) ke liye hai.

// React mein isse integrate karne ke liye aapko ek Hidden Form create karke usey submit karna hoga. Jab aap create-order API call karenge, toh backend aapko payment_data dega, jise hume Paytm ke server par POST karna hai.

// Yahan sahi code aur workflow hai:

// 1. Payment Integration Logic (React)
// Aapko Paytm SDK load karne ki zaroorat nahi hai agar aap Redirect flow use kar rahe hain. Bas ye logic follow karein: 



// const handlePay = async () => {
//   try {
//     const orderData = {
//       product_id: commonData?.cp_ids?.product_id,mujhe batao ki , 
//       result_id: 39887,
//       coupon_code: appliedCoupon,
//       is_coupon_applied: !!appliedCoupon,
//       source: "WEB",
//       tracking: {
//         utm_source: "google",
//         utm_medium: "cpc",
//         ici: "campaign_id",
//         page_url: window.location.href,
//       },
//     };

//     // 1️⃣ Backend se Order Create karein  
//     const response = await dispatch(paymentGenerate(orderData));
    
//     // API Response structure check karein (success hona chahiye)
//     if (response?.success && response?.payment_data) {
//       const { paytm_url, payment_data } = response;

//       // 2️⃣ Redirect karne ke liye form banayein
//       redirecttoPaytm(paytm_url, payment_data);
//     } else {
//       alert("Order creation failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Payment Error:", error);
//   }
// };

// // 3️⃣ Form Helper Function (Ye function Paytm page par bhej dega)
// const redirecttoPaytm = (url, data) => {
//   const form = document.createElement('form');
//   form.method = 'post';
//   form.action = url;

//   // Saara payment_data (MID, ORDER_ID, CHECKSUM etc.) inputs mein daalein
//   Object.keys(data).forEach((key) => {
//     const input = document.createElement('input');
//     input.type = 'hidden';
//     input.name = key;
//     input.value = data[key];
//     form.appendChild(input);
//   });

//   document.body.appendChild(form);
//   form.submit(); // Ye command user ko Paytm page par le jayegi
// };


// Staging vs Production: Check karein ki paytm_url staging ka hai ya production ka. Aapke JSON mein securegw.paytm.in hai, jo ki production URL hai.

// Checksum: Kabhi bhi checksum frontend par calculate mat karna, hamesha backend se aana chahiye (jo aapke case mein aa raha hai).





// Serial NUmber : PF5YXY0F






// Haan, bilkul! Aapka concept ekdum sahi hai aur ye Safari ki "Third-Party Cookie" wali bandish ko bypass karne ka sabse behtareen tarika hai.

// Jab aap abc.com se xyz.com par direct cookie set karne ki koshish karte hain, toh Safari usse "cross-site tracking" samajhkar block kar deta hai. Lekin jo solution hum discuss kar rahe hain, usme hum "First-Party" context ka use karenge.

// Yahan workflow hai jo aapko implement karna hai:

// Step 1: Backend (abc.com) par badlav
// Pehle aap direct redirect kar rahe the, ab aapko URL ke saath token chipkana hai.

// Purana Link: https://xyz.com/dashboard

// Naya Link: https://xyz.com/set-session?token=ABC123XYZ

// Step 2: Frontend (xyz.com) par ek naya Page/Route
// xyz.com par ek naya route banaiye (manlo /set-session). Ye page user ko dikhega nahi, bas 1-2 second ke liye load hoga.

// Logic (Final Code for xyz.com):

// JavaScript
// // xyz.com/set-session page par ye code likhein
// import { useEffect } from 'react';

// const SetSession = () => {
//   useEffect(() => {
//     // 1. URL se token nikalo
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');

//     if (token) {
//       // 2. Cookie set karo (Ab ye xyz.com ke andar ho raha hai, toh Safari ise block nahi karega)
//       // SameSite=Lax rakhein kyunki ab hum SAME domain par hain
//       document.cookie = `session_token=${token}; path=/; domain=.xyz.com; Secure; SameSite=Lax; Max-Age=86400`;

//       // 3. Cookie set hone ke baad dashboard par bhej do
//       window.location.href = "https://xyz.com/dashboard";
//     }
//   }, []);

//   return <div>Logging you in...</div>;
// };
// Ye "Ek Baar Mein" Kyun Kaam Karega?
// Context Change: Safari ko lagta hai ki user ne xyz.com par visit kiya hai aur xyz.com khud apni cookie set kar raha hai. Ye First-Party activity hai, jo 100% allowed hai.

// No More Cross-Site: Hum browser ko ye nahi keh rahe ki "Bhai abc.com ki cookie xyz.com par bhej do". Hum keh rahe hain "xyz.com par jao aur wahan local token se apni cookie bana lo".

// SameSite=Lax: Kyunki hum domain ke andar aa chuke hain, humein SameSite=None ki zaroorat hi nahi padegi. Lax Safari mein bina kisi issue ke chalta hai.

// Zaroori Warning:
// Agar aapka token bahut sensitive hai (jaise main password hash), toh backend par ek "One-Time Exchange Token" banaiye jo sirf 30 seconds ke liye valid ho.

// abc.com ek temporary code generate karega.

// xyz.com us code ko lekar backend se asli session token exchange kar lega.
// Isse URL mein asli token leak hone ka khatra nahi rahega.

// Kya aap chahte hain main aapko is "One-Time Token Exchange" ka backend logic bhi likh kar dun?




// Person A: 1 minute to cross.

// Person B: 2 minutes to cross.

// Person C: 5 minutes to cross.

// Person D: 10 minutes to cross.

// first 1, 2 => 3 minute -> cross second 1 return 
// 2 cross

// 1,5,10
// 
// 3+10 => 13 minute

// second 5, 10, 




