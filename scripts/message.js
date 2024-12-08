// TODO: hiding the webhook URL in cloudflare /functions
const webhookURL = "https://discord.com/api/webhooks/1315256344881922081/qroFX5ad6CE_EucvxWz0_Hc3y7Vs-TtjWimIrRiem8eMO2BkfGW6f5ex4WTw72u1yt4o";
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
