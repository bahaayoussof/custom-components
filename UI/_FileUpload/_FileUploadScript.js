function initDragDropUpload(containerId) {
	const container = document.getElementById(containerId);
	if (!container) return null;

	const dropArea = container.querySelector(".drag-area"),
		dragFile = dropArea.querySelector(".drag-file"),
		button = dropArea.querySelector(".file-input-button"),
		input = dropArea.querySelector(".file-input");

	let documentImages = container.querySelector(".document-images");

	// Store actual File objects
	let uploadedFiles = [];

	// Event listeners registry
	const listeners = {};

	const emit = (event, data) => {
		if (listeners[event]) {
			listeners[event].forEach(cb => cb(data));
		}
	};

	button.onclick = () => {
		input.click();
	};

	input.addEventListener("change", function (e) {
		const target = e.target;
		handleFiles(target.files);
		// Reset input value to allow selecting the same file again if needed
		target.value = '';
	});

	const validationInput = container.querySelector(".file-validation-input");
	if (validationInput) {
		validationInput.addEventListener("invalid", (e) => {
			const requiredErrorMessage = container.querySelector(".required-error");
			if (requiredErrorMessage) {
				requiredErrorMessage.classList.remove("hidden");
			}
		});
	}

	// Finding the document closest to the delete button and removing it from the list
	documentImages.addEventListener("click", (e) => {
		const target = e.target;
		const deleteFileButton = target.closest(".delete-document");
		const documentsWrapper = target.closest(".document-images");
		const documentToDelete = target.closest(".document-file");

		if (!deleteFileButton || !documentToDelete) return;

		const documentName = documentToDelete.querySelector("span.fileName").innerText;

		const index = uploadedFiles.findIndex((x) => x.name === documentName);
		if (index !== -1) {
			const removedFile = uploadedFiles[index];
			uploadedFiles.splice(index, 1);
			updateValidationInput();
			emit('file-removed', removedFile);
			emit('change', uploadedFiles);
		}
		documentsWrapper.removeChild(documentToDelete);
	});

	// Drag events
	dropArea.addEventListener("dragover", (event) => {
		event.preventDefault();
		dropArea.classList.add("active");
		dragFile.textContent = "أفلت الملف هنا للرفع";
	});

	dropArea.addEventListener("dragleave", () => {
		dropArea.classList.remove("active");
		dragFile.textContent = "اسحب و أفلت الملفات هنا للرفع";
	});

	dropArea.addEventListener("drop", (e) => {
		e.preventDefault();
		const target = e.dataTransfer;
		dropArea.classList.remove("active");
		dragFile.textContent = "اسحب و أفلت الملفات هنا للرفع";
		handleFiles(target.files);
	});

	function updateValidationInput() {
		const validationInput = container.querySelector(".file-validation-input");
		const requiredErrorMessage = container.querySelector(".required-error");

		if (validationInput) {
			const isValid = uploadedFiles.length > 0;
			validationInput.value = isValid ? "valid" : "";

			if (isValid && requiredErrorMessage) {
				requiredErrorMessage.classList.add("hidden");
			}
		}
	}

	function handleFiles(files) {
		if (!files || files.length === 0) {
			container.querySelector(".required-error").classList.remove("hidden");
			return;
		};

		const file = files[0];
		const fileName = file.name;
		const fileSize = file.size;

		let filesizeErrorMessage = container.querySelector(".filesize-error");
		let filetypeErrorMessage = container.querySelector(".filetype-error");

		let sizeInMB = Number.parseFloat(fileSize / (1024 * 1024)).toFixed(2);
		if (sizeInMB > 5) {
			filesizeErrorMessage.classList.remove("hidden");
			filetypeErrorMessage.classList.add("hidden");
		} else {
			filesizeErrorMessage.classList.add("hidden");
			const fileTypes = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
			if (fileTypes.includes(file.type)) {
				filetypeErrorMessage.classList.add("hidden");

				let newDocument = document.createElement("li");
				newDocument.setAttribute(
					"class",
					"pb-3 flex justify-between items-center md:items-end text-xs md:text-sm text-slate-700 border-b-2 border-slate-100 gap-1 document-file"
				);

				newDocument.innerHTML = `
                <div style="background-color:#F3F4F6;border:1px solid #D2D6DB;" class="w-100 p-2 d-flex align-items-center justify-content-between rounded">
                <div class="d-flex align-items-center">
                <p class="whitespace-nowrap overflow-hidden text-ellipsis w-40 mb-0"><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 19.6668C15.0628 19.6668 19.1668 15.5628 19.1668 10.5002C19.1668 5.43755 15.0628 1.3335 10.0002 1.3335C4.93755 1.3335 0.833496 5.43755 0.833496 10.5002C0.833496 15.5628 4.93755 19.6668 10.0002 19.6668Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 19.6668C15.0628 19.6668 19.1668 15.5628 19.1668 10.5002C19.1668 5.43755 15.0628 1.3335 10.0002 1.3335C4.93755 1.3335 0.833496 5.43755 0.833496 10.5002C0.833496 15.5628 4.93755 19.6668 10.0002 19.6668ZM5.87534 9.76793C5.54991 10.0934 5.54991 10.621 5.87534 10.9464L8.23237 13.3035C8.5578 13.6289 9.08544 13.6289 9.41088 13.3035L14.1249 8.58942C14.4504 8.26398 14.4504 7.73634 14.1249 7.41091C13.7995 7.08547 13.2718 7.08547 12.9464 7.41091L8.82162 11.5357L7.05385 9.76793C6.72842 9.44249 6.20078 9.44249 5.87534 9.76793Z" fill="#067647"/></svg>
                <span class="mb-0 fileName">${fileName}</span></p>

                </div>
                <button type="button" class="delete-document btn-btn-link p-0 bg-transparent border-0"><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.64645 6.14645C5.84171 5.95118 6.15829 5.95118 6.35355 6.14645L10 9.79289L13.6464 6.14645C13.8417 5.95118 14.1583 5.95118 14.3536 6.14645C14.5488 6.34171 14.5488 6.65829 14.3536 6.85355L10.7071 10.5L14.3536 14.1464C14.5488 14.3417 14.5488 14.6583 14.3536 14.8536C14.1583 15.0488 13.8417 15.0488 13.6464 14.8536L10 11.2071L6.35355 14.8536C6.15829 15.0488 5.84171 15.0488 5.64645 14.8536C5.45118 14.6583 5.45118 14.3417 5.64645 14.1464L9.29289 10.5L5.64645 6.85355C5.45118 6.65829 5.45118 6.34171 5.64645 6.14645Z" fill="#161616" /></svg></button>
                </div>
                `;
				documentImages.append(newDocument);
				uploadedFiles.push(file);
				updateValidationInput();
				emit('file-added', file);
				emit('change', uploadedFiles);
			} else {
				filetypeErrorMessage.classList.remove("hidden");
			}
		}
	}

	// Return API
	return {
		getFiles: () => uploadedFiles,
	};
}
