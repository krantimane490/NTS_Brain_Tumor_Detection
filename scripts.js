function previewImage() {
    const input = document.getElementById('imageUpload');
    const preview = document.getElementById('imagePreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Medical Image">`;

            // Example placeholder detection result
            document.getElementById('detectionResult').innerHTML =
                `<img src="${e.target.result}" alt="Detection Result Placeholder">`;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = "<p>No image selected</p>";
        document.getElementById('detectionResult').innerHTML = "<p>Processed result will appear here</p>";
    }
}
