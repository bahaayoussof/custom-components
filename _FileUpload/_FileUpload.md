# _FileUpload

![_FileUpload](file-upload.png)

```html
@model (string Label, bool Required, string Id)

<div id="@Model.Id" class="col-12 mt-3 file-upload-container">
	<label class="form-label">
		@if (Model.Required)
		{
		<span style="color: #B42318;">*</span>
		}
		@Model.Label
	</label>
	<div class="d-flex flex-column align-items-center w-100">
		<!-- Documents uploads form and instructions -->
		<section class="w-100">
			<div class="d-flex flex-column align-items-center p-4 drag-area border-dotted rounded mb-3"
				style="background: #00A79D0D;">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M12.9998 1.25C16.1608 1.25 17.903 1.25 19.23 2.185C19.611 2.453 19.95 2.773 20.24 3.136C21.251 4.407 21.251 6.034 21.251 9.273V11.818C21.251 14.873 21.251 16.406 20.729 17.722C19.895 19.827 18.139 21.484 15.911 22.266C14.7097 22.6868 13.3248 22.741 10.8533 22.748C10.841 22.749 10.8287 22.75 10.8163 22.751C10.8019 22.7521 10.7878 22.751 10.7741 22.7482C10.4315 22.749 10.0683 22.749 9.68208 22.749C7.80016 22.749 6.85498 22.749 6.01699 22.455C4.65599 21.977 3.582 20.963 3.071 19.674C2.75 18.865 2.75 17.968 2.75 16.1821V11.6694C2.75 11.2554 3.086 10.9194 3.5 10.9194C3.914 10.9194 4.25 11.2554 4.25 11.6694V16.182C4.25 17.7779 4.25 18.579 4.46499 19.122C4.81599 20.007 5.56301 20.707 6.51301 21.041C7.11001 21.251 7.96899 21.251 9.68096 21.251C10.0634 21.251 10.4221 21.251 10.7591 21.2502C12.0619 21.1198 13.083 20.0167 13.083 18.6801C13.083 18.5202 13.075 18.3479 13.0666 18.1657L13.0647 18.1252C13.0398 17.5806 13.0115 16.964 13.165 16.3881C13.388 15.5561 14.043 14.9011 14.875 14.6781C15.4506 14.5248 16.0659 14.5529 16.6112 14.5778L16.6511 14.5797C16.8339 14.5881 17.0067 14.5961 17.167 14.5961C18.5666 14.5961 19.7102 13.4765 19.749 12.086C19.749 11.9985 19.749 11.9095 19.749 11.8192V9.274C19.749 6.383 19.749 4.932 19.064 4.071C18.864 3.82 18.629 3.598 18.364 3.413C17.465 2.78 15.9868 2.752 12.9978 2.752C12.5838 2.752 12.2478 2.416 12.2478 2.002C12.2478 1.588 12.5838 1.252 12.9978 1.252L12.9998 1.25ZM19.6944 15.2175C18.9986 15.7675 18.1204 16.0961 17.167 16.0961C16.9762 16.0961 16.7811 16.0875 16.5905 16.079C16.5763 16.0784 16.5621 16.0777 16.548 16.0771L16.5321 16.0764C16.0781 16.0556 15.6109 16.0342 15.263 16.1281C14.948 16.2121 14.699 16.4611 14.615 16.7761C14.5212 17.1283 14.5429 17.6009 14.5638 18.0578L14.564 18.0611C14.574 18.2651 14.583 18.4751 14.583 18.6801C14.583 19.6161 14.2663 20.4796 13.7344 21.1691C14.4126 21.1122 14.9462 21.0157 15.413 20.852C17.23 20.214 18.659 18.872 19.333 17.171C19.5375 16.6548 19.6415 16.0447 19.6944 15.2175Z"
						fill="#161616" />
					<path
						d="M5.58933 4.35931C5.39711 4.60404 5.19487 4.86115 5.03781 5.02274C4.74911 5.31977 4.27428 5.32651 3.97726 5.03781C3.68023 4.74911 3.67349 4.27428 3.96219 3.97726C4.05089 3.886 4.19651 3.70419 4.40971 3.43276L4.45675 3.37284C4.64683 3.13069 4.8698 2.84663 5.09954 2.57551C5.34574 2.28495 5.62131 1.98316 5.89679 1.74854C6.03484 1.63096 6.19043 1.51499 6.35782 1.42541C6.51926 1.33902 6.74172 1.25 7 1.25C7.25829 1.25 7.48074 1.33902 7.64218 1.42541C7.80957 1.51499 7.96517 1.63096 8.10321 1.74854C8.37869 1.98316 8.65426 2.28495 8.90047 2.57551C9.1302 2.84663 9.35317 3.13068 9.54324 3.37282L9.59029 3.43276C9.80349 3.70419 9.94911 3.886 10.0378 3.97726C10.3265 4.27428 10.3198 4.74911 10.0227 5.03781C9.72572 5.32651 9.25089 5.31977 8.96219 5.02274C8.80513 4.86115 8.6029 4.60404 8.41067 4.3593L8.36595 4.30235C8.17304 4.05663 7.96675 3.79386 7.75606 3.54522L7.75 3.53807V10C7.75 10.4142 7.41421 10.75 7 10.75C6.58579 10.75 6.25 10.4142 6.25 10V3.53807L6.24394 3.54522C6.03326 3.79385 5.82698 4.05661 5.63408 4.30232L5.58933 4.35931Z"
						fill="#161616" />
				</svg>
				<header class="mt-3">
					<span class="drag-file font-weight-bold">اسحب و أفلت الملفات هنا للرفع
					</span>
				</header>
				<p class="text-center text-dark-grey mb-0">الحد الأقصى لحجم الملف المسموح به هو
					2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf.</p>

				<!-- if used inside form consider add type="button" to avoid submitting the form behavior -->
				<button type="button" class="btn btn-outline-dark file-input-button mt-3">
					تصفح الملفات

					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.58333 5.625C9.58333 5.27982 9.30351 5 8.95833 5C8.61316 5 8.33333 5.27982 8.33333 5.625V8.33333H5.625C5.27982 8.33333 5 8.61316 5 8.95833C5 9.30351 5.27982 9.58333 5.625 9.58333H8.33333V12.2917C8.33333 12.6368 8.61316 12.9167 8.95833 12.9167C9.30351 12.9167 9.58333 12.6368 9.58333 12.2917V9.58333H12.2917C12.6368 9.58333 12.9167 9.30351 12.9167 8.95833C12.9167 8.61316 12.6368 8.33333 12.2917 8.33333H9.58333V5.625Z"
							fill="#161616" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M8.95833 17.9167C4.01078 17.9167 0 13.9059 0 8.95833C0 4.01078 4.01078 0 8.95833 0C13.9059 0 17.9167 4.01078 17.9167 8.95833C17.9167 13.9059 13.9059 17.9167 8.95833 17.9167ZM1.25 8.95833C1.25 13.2155 4.70114 16.6667 8.95833 16.6667C13.2155 16.6667 16.6667 13.2155 16.6667 8.95833C16.6667 4.70114 13.2155 1.25 8.95833 1.25C4.70114 1.25 1.25 4.70114 1.25 8.95833Z"
							fill="#161616" />
					</svg>
				</button>

				<input type="file" class="file-input" name="@Model.Id" hidden />
				<!-- Proxy input for HTML5 validation -->
				<input type="text" class="file-validation-input" name="@(Model.Id)_validation"
					style="opacity: 0; width: 1px; height: 1px; position: absolute; z-index: -1;" @(Model.Required ? "required"
					: "" ) />

				<!-- Images groups - All the selected images will be shown here -->
				<p class="text-center text-sm hidden text-danger mt-3 mb-0 filesize-error">
					حجم الملف يجب أن يكون أقل من 5 ميجا بايت
				</p>
				<p class="text-center text-sm hidden text-danger mt-3 mb-0 filetype-error">
					الملف يجب أن يكون بصيغة PDF أو PNG أو JPG
				</p>
				<p class="text-center text-sm hidden text-danger mt-3 mb-0 required-error">
					هذا الحقل مطلوب
				</p>
			</div>
		</section>

		<!-- No document selected -->
		<p class="hidden text-sm text-red-600 text-center bg-pink-200 mt-6 p-3 rounded-lg input-empty-error"></p>
		<!-- Showing all the files inside this list -->
		<ul class="w-100 px-0 document-images"></ul>
	</div>
</div>


<script type="text/javascript" src="~/assets/scripts/drag-drop-upload.js"></script>
<script>
	(function () {
		window.fileUploads = window.fileUploads || {};
		window.fileUploads["@Model.Id"] = initDragDropUpload("@Model.Id");
	})();
</script>
```

### How to use

```cshtml
<partial name="_FileUpload" model='("اسم العنصر", true, "my-upload-1")' />
<partial name="_FileUpload" model='(" العنصر", false, "my-upload-2")' />

<script>
function submitForm() {
		// Collect files from all instances using the global registry
		var files1 = window.fileUploads["my-upload-1"]?.getFiles() || [];
		var files2 = window.fileUploads["my-upload-2"]?.getFiles() || [];

		console.log("Files from my-upload-1:", files1);
		console.log("Files from my-upload-2:", files2);

		var formData = new FormData();

		files1.forEach(file => formData.append("Attachment1", file));
		files2.forEach(file => formData.append("Attachment2", file));

		console.log("FormData prepared with " + (files1.length + files2.length) + " files.");
}
</script>
```
| Parameter | Type | Description | Default Value |
| --- | --- | --- | --- |
| Label | string | The label of the input field | "" |
| Required | bool | Whether the input field is required or not | false |
| Id | string | The ID of the input field | "" |
