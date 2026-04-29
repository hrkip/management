const GAS_API_URL = "https://script.google.com/macros/s/AKfycbw361eIAFe0CTpRrfDngFhsm_sdfBtJI6Ptuq5UqUICGM-Ps8-nDBvLyWByt_p5n_DtfQ/exec";

function apiCall(action, payload = {}) {
  return fetch(GAS_API_URL, {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action,
      payload
    })
  }).then(async response => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Invalid API response:", text);
      return {
        success: false,
        message: "Invalid API response from GAS."
      };
    }
  });
}
