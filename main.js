let trigger = document.getElementById('clicked');
trigger.addEventListener('click', async () => {
	console.log(typeof trigger.innerHTML);
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (trigger.innerHTML == 'Start') {
		trigger.innerHTML = 'Stop';
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: sendConnect,
		});
	} else {
		trigger.innerHTML = 'Start';
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: stopConnecting,
		});
	}
});

function sendConnect() {
	let i = 0;
	try {
		let nodes1 = document.querySelectorAll('.artdeco-button--secondary');
		const timer = setInterval(() => {
			let context1 = nodes1[i].children[0].innerHTML;
			if (context1.match('Connect')) {
				nodes1[i].click();
				console.log(nodes1[i]);
				let nodes2 = [];
				setTimeout(() => {
					nodes2 = document.querySelectorAll('.artdeco-button--primary');
					nodes2.forEach(node2 => {
						let context2 = node2.children[0].innerHTML;
						if (context2.match('Send')) {
							node2.click();
						}
					});
				}, 1000);
				let id = nodes1[i].id;
				let button = document.getElementById(id);
				button.style.boxShadow = '0 0 0 2px #0a66c2';
				button.style.backgroundColor = '#B5D9FD';
				console.log('passed');
			}
			i = i + 1;
			if (i == nodes1.length) {
				clearInterval(timer);
			}
		}, 2000);
	} catch (err) {
		console.log(error);
	}
}

function stopConnecting() {
	location.reload();
}
