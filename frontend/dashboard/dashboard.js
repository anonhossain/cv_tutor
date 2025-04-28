document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Get form data
    const jobDesc = document.getElementById('jobDescription').value;
    const resumeFile = document.getElementById('resumeFile').files[0];
  
    const formData = new FormData();
    formData.append('job_desc', jobDesc);
    formData.append('resume', resumeFile);
  
    // Show loading
    document.getElementById('loading').style.display = 'block';
  
    try {
      // Upload the files
      const response = await fetch('/api/upload_files', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Hide loading and show the process button
        document.getElementById('loading').style.display = 'none';
        document.getElementById('processContainer').style.display = 'block';
      } else {
        alert('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred during file upload');
      document.getElementById('loading').style.display = 'none';
    }
  });
  
  async function processResume() {
    try {
      const response = await fetch('/api/process_resume', {
        method: 'POST',
        body: new URLSearchParams({
          action: 'process',
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Display processed resume result
        document.getElementById('resultContent').textContent = data.message;
        document.getElementById('resultPanel').style.display = 'block';
      } else {
        alert('Failed to process resume');
      }
    } catch (error) {
      console.error('Error processing resume:', error);
      alert('An error occurred during resume processing');
    }
  }
  