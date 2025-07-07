import axios from "axios";

let TOKEN = process.env.SMS_TOKEN;

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function refreshToken() {
  try {
    const res = await axios.patch(
      'http://notify.eskiz.uz/api/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    TOKEN = res.data.data.token;
    console.log("Token refreshed:", TOKEN);
    return true;
  } catch (err) {
    console.error("Token refresh failed:", err.message);
    return false;
  }
}

export async function sendSms(phoneNumber: string, type: number, hashKey?: string) {
  try {
    const code = generateCode();

    let message = "";
    if (type === 1)
      message = `Kodni hech kimga bermang! Zein edtech ilovasiga ro‘yxatdan o‘tish uchun kod: ${code} ${hashKey}`;
    else if (type === 2)
      message = `Kodni hech kimga bermang! Zein edtech ilovasiga login qilish uchun tasdiqlash kodi: ${code} ${hashKey}`;

    const send = async () => {
      return await axios.post(
        "http://notify.eskiz.uz/api/message/sms/send",
        {
          mobile_phone: +phoneNumber,
          message: message,
          from: 4546,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    };

    let response = await send();

    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        response = await send();
      } else {
        throw new Error("Unable to refresh token");
      }
    }

    return code;
  } catch (err) {
    console.error("SMS sending error:", err.message);
    return "Error";
  }
}
