import moment from "moment";
import axios from "axios";

const testMpesaConfig = () => {
  console.log("Consumer Key:", process.env.MPESA_CONSUMER_KEY);
  console.log("Environment:", process.env.MPESA_ENV);

  return true;
};

const generateTimestamp = () => {
  return moment().format("YYYYMMDDHHmmss");
};

const generateAuthString = () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  console.log("Auth String Generated Successfully");

  return auth;
};

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  return response.data.access_token;
};

const generatePassword = (timestamp) => {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;

  const str = `${shortcode}${passkey}${timestamp}`;

  return Buffer.from(str).toString("base64");
};

const stkPush = async ({ phone, amount }) => {
  try {
    // 1. Validate inputs early
    if (!phone || !amount) {
      throw new Error("Phone and amount are required");
    }

    const timestamp = moment().format("YYYYMMDDHHmmss");

    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    // 2. DEBUG ENV (IMPORTANT)
    console.log("🔥 MPESA CONFIG CHECK:", {
      shortcode,
      passkey: passkey ? "SET" : "MISSING",
      callbackUrl,
    });

    // 3. Generate password
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
      "base64",
    );

    // 4. Get token
    const accessToken = await getAccessToken();

    // 5. Build payload
    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: "BethanyBooking",
      TransactionDesc: "Property Booking Payment",
    };

    // 6. CRITICAL DEBUG (THIS IS WHAT YOU WERE MISSING)
    console.log("🚀 STK PAYLOAD SENT TO SAFARICOM:");
    console.log(JSON.stringify(payload, null, 2));

    // 7. Send request
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("✅ STK RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ STK PUSH ERROR:");
    console.error(error.response?.data || error.message);

    throw error;
  }
};

export {
  testMpesaConfig,
  generateAuthString,
  getAccessToken,
  generateTimestamp,
  generatePassword,
  stkPush,
};
