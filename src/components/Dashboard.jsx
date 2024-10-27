import { useState } from "react";
import { File, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

// Tooltip Component
const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-white bg-black rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [jobFile, setJobFile] = useState(null);
  const [jobError, setJobError] = useState("");
  const [resumeFiles, setResumeFiles] = useState([]);
  const [resumeError, setResumeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedReport, setFormattedReport] = useState(null);

  // Handle Job Description File Change
  const handleJobFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxFileSize = 1 * 1024 * 1024; // 1MB

    if (selectedFile && selectedFile.size > maxFileSize) {
      setJobError("File exceeds size limit.");
      setJobFile(null);
    } else {
      setJobError("");
      setJobFile(selectedFile);
    }
  };

  const handleJobFileRemove = () => {
    setJobFile(null);
    setJobError("");
  };

  // Handle Resume File Change
  const handleResumeFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxFileSize = 1 * 1024 * 1024; // 1MB

    const invalidFiles = selectedFiles.filter((file) => file.size > maxFileSize);

    if (invalidFiles.length > 0) {
      setResumeError("Some files exceed the size limit.");
    } else {
      setResumeError("");
      setResumeFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  // Function to generate the report by hitting the API using fetch
  // Function to generate the report by hitting the API using fetch
  const generateReport = () => {
    if (!jobFile || resumeFiles.length === 0) {
      alert("Please upload both a job description and resume(s).");
      return;
    }

    setLoading(true);
    setFormattedReport(null);

    const formData = new FormData();
    formData.append("jd", jobFile);
    resumeFiles.forEach((file) => formData.append("resume", file));

    // Append candidate name (modify as needed)
    formData.append("candidateName", "John Doe");

    fetch("https://fy-llm-api-v2.onrender.com/generate-report/", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reportData = await response.json();
        if (reportData && reportData.report) {
          const cleanedReport = reportData.report
            .replace(/\*\*/g, "")
            .replace(/#/g, "");
          setFormattedReport(cleanedReport);
        } else {
          alert("Failed to generate the report. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error occurred while generating the report:", error);
        alert("An error occurred while generating the report. Please try again later.");
      })
      .finally(() => setLoading(false));
  };


  // Function to download the report as PDF using jsPDF and handle pagination
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Add title
    doc.setFontSize(12);
    doc.text("Fitment Report", 40, 40);

    // Add the content of the report to the PDF
    const reportContent = formattedReport ? formattedReport : "No report available";

    const marginLeft = 40;
    const marginTop = 60;
    const maxLineWidth = 500;
    const lineHeight = 20;
    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 40;

    let cursorY = marginTop;

    // Split the report content into multiple lines for the page width
    const lines = doc.splitTextToSize(reportContent, maxLineWidth);

    // Add the report text to the PDF page by page
    lines.forEach((line) => {
      // Check if the line looks like a heading/subheading
      if (line.trim() === "Fitment Report" || line.trim().endsWith(":")) {
        doc.setFont("helvetica", "bold"); // Set bold font for headings/subheadings
      } else {
        doc.setFont("helvetica", "normal"); // Set normal font for regular text
      }

      if (cursorY + lineHeight > pageHeight - bottomMargin) {
        doc.addPage(); // Add a new page if the current page is full
        cursorY = marginTop; // Reset cursorY for the new page
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });

    // Save the PDF
    doc.save("fitment_report.pdf");
  };

  // Function to bold the headings and subheadings in the displayed report and format the table
  const formatReportForDisplay = (report) => {
    if (!report) return "";

    // Split report by line and check for heading/subheading structure
    return report.split("\n").map((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine === "Fitment Report" || trimmedLine.endsWith(":")) {
        return (
          <strong key={index} className="block mt-2">
            {trimmedLine}
          </strong>
        );
      } else if (trimmedLine.startsWith("|")) {
        // Format the matching score table in tabular format
        const cells = trimmedLine.split("|").filter(Boolean).map((cell) => cell.trim());
        return (
          <div key={index} className="flex justify-between text-sm font-mono">
            {cells.map((cell, i) => (
              <span key={i} className="px-2">
                {cell}
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <span key={index} className="block">
            {trimmedLine}
          </span>
        );
      }
    });
  };

  return (
    <div className="flex flex-col items-center my-6 w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-orange-700 text-transparent bg-clip-text mb-2">
          Upload Files & Generate Fitment Report
        </h1>
        <p className="text-lg text-gray-600">
          Easily upload job descriptions and candidate resumes to receive an
          accurate skill fitment analysis within seconds.
        </p>
      </div>

      <div className="flex justify-center items-start space-x-6 w-full">
        {/* Job Description Upload */}
        <div className="p-16 flex flex-col items-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600 w-1/3 hover:shadow-lg transition-shadow">
          <input
            type="file"
            id="file-upload-job"
            onChange={handleJobFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload-job"
            className="cursor-pointer text-center flex flex-col items-center"
          >
            <div className="flex justify-center items-center bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200 p-4 mb-4">
              <File className="w-10 h-10" />
            </div>
            <p className="font-semibold text-gray-700 dark:text-neutral-200">
              {jobFile ? jobFile.name : "Upload Job Description"}
            </p>
          </label>

          {jobFile && (
            <button
              onClick={handleJobFileRemove}
              className="mt-4 text-red-500 hover:underline"
            >
              <Trash2 className="inline-block w-4 h-4 mr-2" /> Remove Job Description
            </button>
          )}
          {jobError && <p className="mt-2 text-red-500">{jobError}</p>}
        </div>

        {/* Resume Upload */}
        <div className="p-16 flex flex-col items-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600 w-1/3 hover:shadow-lg transition-shadow">
          <input
            type="file"
            id="file-upload-resume"
            onChange={handleResumeFileChange}
            multiple
            className="hidden"
          />
          <label
            htmlFor="file-upload-resume"
            className="cursor-pointer text-center flex flex-col items-center"
          >
            <div className="flex justify-center items-center bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200 p-4 mb-4">
              <File className="w-10 h-10" />
            </div>
            <p className="font-semibold text-gray-700 dark:text-neutral-200">
              {resumeFiles.length > 0
                ? `${resumeFiles.length} file(s) selected`
                : "Upload Resume(s)"}
            </p>
          </label>

          <button
            onClick={() => setResumeFiles([])}
            className="mt-4 text-red-500 hover:underline"
          >
            <Trash2 className="inline-block w-4 h-4 mr-2" /> Remove All Resumes
          </button>
          {resumeError && <p className="mt-2 text-red-500">{resumeError}</p>}
        </div>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={generateReport}
        className="mt-8 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Fitment Report"}
      </button>

      {/* Report Section */}
      {formattedReport && (
        <div className="mt-10 w-full max-w-4xl  p-6 rounded-lg shadow-md border border-1">
          <h2 className="text-2xl font-semibold mb-4 text-center">Generated Fitment Report</h2>
          <div className="text-white">{formatReportForDisplay(formattedReport)}</div>

          {/* Download PDF Button */}
          <Tooltip content="Download the report as a PDF file">
            <button
              onClick={downloadPDF}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Download as PDF
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
