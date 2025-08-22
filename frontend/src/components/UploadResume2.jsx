 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import './UploadResume2.css';

// Configurer le worker pour react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const UploadResume2 = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [scale, setScale] = useState(0.5); // Échelle d'affichage
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Vérifier la taille du fichier (par exemple, max 5 Mo)
      if (uploadedFile.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 5 Mo.');
        return;
      }
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setCurrentPage(1); // Réinitialiser à la première page
      setNumPages(null); // Réinitialiser le nombre de pages
    }
  };

  const handleNextClick = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      navigate('/edit-resume', { state: { fileUrl, fileName: file.name } });
    } else {
      alert('Veuillez sélectionner un fichier d’abord.');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    alert('Erreur lors du chargement du PDF. Veuillez vérifier que le fichier est valide.');
    console.error('Erreur de chargement du PDF :', error);
    setFile(null);
    setFileName('');
    setNumPages(null);
  };

  const changePage = (offset) => {
    setCurrentPage((prevPage) => Math.min(Math.max(prevPage + offset, 1), numPages));
  };

  const handleZoomChange = (newScale) => {
    setScale(Math.max(0.2, Math.min(newScale, 2))); // Limiter le zoom entre 0.2 et 2
  };

  return (
    <div className="upload-resume-container">
      <div className="progress-bar">
        <span className="step active">1</span>
        <span className="step active">2</span>
        <span className="step">3</span>
      </div>
      <button className="login-btn">
        <Link to="/login">Connexion</Link>
      </button>
      <div className="content">
        <div className="background-shapes"></div>
        <h2>Téléchargez votre CV existant</h2>
        <p>Veuillez téléverser votre fichier de CV (PDF) pour commencer.</p>
        <div className="upload-area">
          <label htmlFor="resume-upload" className="upload-label">
            {fileName ? fileName : 'Choisir un fichier...'}
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf" // Accepter uniquement les PDF
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        {/* Aperçu du PDF */}
        {file && (
          <div className="pdf-preview">
            <h3>Aperçu du fichier :</h3>
            <div className="pdf-controls">
              <button
                onClick={() => changePage(-1)}
                disabled={currentPage <= 1}
                className="pdf-nav-btn"
              >
                Page précédente
              </button>
              <span>
                Page {currentPage} sur {numPages || '...'}
              </span>
              <button
                onClick={() => changePage(1)}
                disabled={currentPage >= numPages}
                className="pdf-nav-btn"
              >
                Page suivante
              </button>
              <div className="zoom-controls">
                <button
                  onClick={() => handleZoomChange(scale - 0.1)}
                  className="zoom-btn"
                >
                  Zoom -
                </button>
                <span>{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => handleZoomChange(scale + 0.1)}
                  className="zoom-btn"
                >
                  Zoom +
                </button>
              </div>
            </div>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="pdf-document"
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        )}
        <button className="next-btn" onClick={handleNextClick}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default UploadResume2;