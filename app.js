const saveInput = document.getElementById("save-input");
const textInput = document.getElementById("text-input");
const leadsList = document.getElementById("leads-list");
const saveTab = document.getElementById("save-tab");
const deleteAll = document.getElementById("delete-all");
const textPrompt = document.getElementById("text-prompt");
let myLeads = [];
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));

if (localStorageLeads) {
	myLeads = localStorageLeads;
	readLeadsFromLocal();
}

saveInput.addEventListener("click", (e) => {
	textPrompt.textContent = "";
	if (textInput.value) {
		myLeads.push(textInput.value);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		addLead(textInput.value);
		textInput.value = "";
	} else {
		textPrompt.textContent = "Please enter a text above!"
	}
});

saveTab.addEventListener("click", (e) => {
	textPrompt.textContent = "";
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		addLead(tabs[0].url);
	});
});

deleteAll.addEventListener("dblclick", (e) => {
	textPrompt.textContent = "";
	localStorage.clear();
	myLeads = [];
	leadsList.innerHTML = "";

});

function readLeadsFromLocal() {
	for (let lead of myLeads) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.setAttribute("href", `${lead}`);
		a.setAttribute("target", "_blank");
		a.textContent = lead;
		li.classList.add("leads-item");
		li.append(a);
		leadsList.append(li);
	}
}

function addLead(lead) {
	const li = document.createElement("li");
	const a = document.createElement("a");
	a.setAttribute("href", `${lead}`);
	a.setAttribute("target", "_blank");
	a.textContent = lead;
	li.classList.add("leads-item");
	li.append(a);
	leadsList.append(li);
}