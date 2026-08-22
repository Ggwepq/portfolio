import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaHeadset, FaEye, FaDownload, FaTimes } from 'react-icons/fa';
import { resumes, getResumeDownloadUrl } from '../data/resumes';
import './ResumeModal.css';

function ResumeModal({ isOpen, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getIcon = (id) => {
        switch (id) {
            case 'it-support':
                return <FaHeadset />;
            case 'developer':
            default:
                return <FaCode />;
        }
    };

    return (
        <div className="resume-modal-backdrop" onClick={onClose}>
            <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="resume-modal-header">
                    <div>
                        <h3 className="resume-modal-title">Select Resume</h3>
                        <p className="resume-modal-subtitle">
                            Choose the version tailored to the role you are hiring for
                        </p>
                    </div>
                    <button
                        className="resume-modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="resume-modal-body">
                    {resumes.map((resume) => {
                        const downloadUrl = getResumeDownloadUrl(resume.url);
                        return (
                            <div key={resume.id} className="resume-option-card">
                                <div className="resume-option-header">
                                    <div className="resume-option-icon">
                                        {getIcon(resume.id)}
                                    </div>
                                    <div className="resume-option-info">
                                        <h4 className="resume-option-title">{resume.title}</h4>
                                    </div>
                                </div>


                                <div className="resume-option-actions">
                                    <Link
                                        to={`/resume?role=${resume.id}`}
                                        className="btn-resume-view"
                                        onClick={onClose}
                                    >
                                        <FaEye /> View in Browser
                                    </Link>
                                    <a
                                        href={downloadUrl}
                                        download={resume.downloadFilename || `${resume.id}-resume.pdf`}
                                        className="btn-resume-dl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaDownload /> Download
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ResumeModal;
