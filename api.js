const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxmxe6OeQ1uVMxfjq54KnJU-X5lgu9xd8rM-5rZXP-w6hMWs4sbaqt0gUoAwRsadAdKfw/exec";

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
