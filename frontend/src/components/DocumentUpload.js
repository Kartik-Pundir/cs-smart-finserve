import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaFilePdf, FaFileImage, FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ACCEPTED = '.pdf,.jpg,.jpeg,.png,.doc,.docx';

const docTypes = [
  { id: 'id_proof',      label: 'ID Proof',           hint: 'Aadhaar / PAN / Passport / Voter ID' },
  { id: 'address_proof', label: 'Address Proof',       hint: 'Utility bill / Rent agreement / Aadhaar' },
  { id: 'income_proof',  label: 'Income Proof',        hint: 'Salary slips / ITR / Form 16' },
  { id: 'bank_statement',label: 'Bank Statement',      hint: 'Last 6 months bank statement' },
  { id: 'photo',         label: 'Passport Photo',      hint: 'Recent passport-size photograph' },
  { id: 'other',         label: 'Other Documents',     hint: 'Any additional supporting documents' },
];

const fileIcon = (file) => {
  if (!file) return null;
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext === 'pdf') return <FaFilePdf className="text-red-500 text-2xl" />;
  if (['jpg', 'jpeg', 'png'].includes(ext)) return <FaFileImage className="text-blue-500 text-2xl" />;
  return <FaFileAlt className="text-gray-500 text-2xl" />;
};

const DocumentUpload = ({ loanType = 'Loan' }) => {
  const [files, setFiles] = useState({});
  const [dragOver, setDragOver] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRefs = useRef({});

  const handleFile = (id, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name} exceeds 5MB limit`);
      return;
    }
    setFiles(prev => ({ ...prev, [id]: file }));
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(id, file);
  };

  const removeFile = (id) => {
    setFiles(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploaded = Object.keys(files);
    if (uploaded.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }
    // In production: send via FormData to backend
    toast.success(`${uploaded.length} document(s) submitted successfully! Our team will review and contact you.`);
    setFiles({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">
            Document Submission
          </span>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Upload Your Documents
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Submit your documents digitally for faster {loanType} processing. All files are encrypted and securely stored. Max 5MB per file.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Documents Submitted!</h3>
            <p className="text-gray-500">Our team will review your documents and get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-cream rounded-2xl p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {docTypes.map((doc) => {
                const file = files[doc.id];
                const isDragging = dragOver === doc.id;
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(doc.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => handleDrop(e, doc.id)}
                    onClick={() => !file && inputRefs.current[doc.id]?.click()}
                    className={`relative rounded-xl border-2 border-dashed p-5 transition-all cursor-pointer
                      ${file ? 'border-accent bg-red-50' : isDragging ? 'border-accent bg-red-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-accent hover:bg-red-50'}`}
                  >
                    <input
                      ref={el => inputRefs.current[doc.id] = el}
                      type="file"
                      accept={ACCEPTED}
                      className="hidden"
                      onChange={(e) => handleFile(doc.id, e.target.files[0])}
                    />

                    {file ? (
                      <div className="flex items-center gap-3">
                        {fileIcon(file)}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(doc.id); }}
                          className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                          <FaTimesCircle className="text-lg" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <FaUpload className="text-gray-300 text-2xl mx-auto mb-2" />
                        <p className="font-semibold text-gray-700 text-sm">{doc.label}</p>
                        <p className="text-xs text-gray-400 mt-1">{doc.hint}</p>
                        <p className="text-xs text-accent mt-2">Click or drag & drop</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            {Object.keys(files).length > 0 && (
              <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {Object.keys(files).length} document(s) ready to submit
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(files).map(([id, f]) => (
                    <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-accent rounded-full text-xs font-medium">
                      <FaCheckCircle className="text-xs" /> {docTypes.find(d => d.id === id)?.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button type="submit"
              className="w-full py-3 bg-accent text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.01]">
              Submit Documents →
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              🔒 Your documents are encrypted and never shared without your consent.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default DocumentUpload;
