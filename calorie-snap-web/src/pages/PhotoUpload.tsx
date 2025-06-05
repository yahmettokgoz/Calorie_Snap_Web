import React, { useState } from 'react';
import './PhotoUpload.css';

const PhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Lütfen bir fotoğraf seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://192.168.1.100:5000/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      alert('Fotoğraf başarıyla yüklendi!');
      console.log(data);
    } catch (error) {
      alert('Yükleme sırasında bir hata oluştu.');
      console.error(error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Öğün Fotoğrafı Yükle</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewURL && <img src={previewURL} alt="Önizleme" className="preview-image" />}
      <button onClick={handleUpload}>Yükle</button>
    </div>
  );
};

export default PhotoUpload;
