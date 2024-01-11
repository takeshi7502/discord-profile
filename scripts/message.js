// TODO: hiding the webhook URL in cloudflare /functions
const webhookURL = "https://discord.com/api/webhooks/1189466291547951174/AvN625D6EkFf6NGXPSRmBsYW4f1i0DrSdMRxVV2PRS_2bjpIPWPulAjS2e-uQ1vipyz0";
const messageInput = document.getElementById("message-input");

let lastMessageTime = 0;

messageInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter" && messageInput.value.trim() !== "") {
		const currentTime = Date.now();
		if (currentTime - lastMessageTime >= 5000) {
			const messageContent = sanitizeMessage(messageInput.value);
			sendMessage(messageContent);
			messageInput.value = "";
			lastMessageTime = currentTime;
		} else {
			alert("Vui lòng đợi 5 giây trước khi gửi tin nhắn tiếp theo!");
		}
	}
});

function sanitizeMessage(message) {
	const sanitizedMessage = message.replace(/@/g, "@.");
	return sanitizedMessage;
}

function sendMessage(message) {
	const data = {
		content: message,
	};

	fetch(webhookURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Gửi tin nhắn thất bại!");
			}
		})
		.catch((error) => {
			console.error("Error: " + error.message);
		});
}
