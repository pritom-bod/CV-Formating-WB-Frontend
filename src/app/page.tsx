// page.tsx

'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Document as DocxDocument, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, BorderStyle, VerticalAlign } from 'docx';
import { saveAs } from 'file-saver';
import { Bold } from 'lucide-react';

interface Education {
    school_university: string;
    degree: string;
    date_obtained: string;
}

interface Language {
    language: string;
    speaking: string;
    reading: string;
    writing: string;
}

interface Employment {
    from: string;
    to: string;
    employer: string;
    position: string;
    location: string;
    for_references: string;
    name: string;
    designation: string;
    telephone: string;
    email: string;
    summary_of_activities: string;
}

interface WorkUndertaken {
  name: string;
  year: string;
  location: string;
  client: string;
    main_features: string;
    position_held: string;
  activities: string;
}

interface CVData {
    name: string;
    phone: string;
    email: string;
    proposed_position: string;
    employer: string;
    date_of_birth: string;
    nationality: string;
    education: Education[];
    membership_in_professional_associations: string;
    publications: string;
    other_training: string;
    countries_experience: string;
    languages: Language[];
    employment_record: Employment[];
    detailed_tasks: string[];
    work_undertaken: WorkUndertaken[];
    worked_for_world_bank: string;
}

const initialCVData: CVData = {
      name: "",
    phone: "",
    email: "",
    proposed_position: "",
    employer: "",
    date_of_birth: "",
    nationality: "",
    education: [],
    membership_in_professional_associations: "",
    publications: "",
    other_training: "",

    countries_experience: "",
    languages: [],
    employment_record: [],
    detailed_tasks: [],
    work_undertaken: [],
    worked_for_world_bank: "",
};

// CV Preview - EXACT design matching your screenshots
const CVDisplay: React.FC<{ data: CVData }> = React.memo(({ data }) => (
    <div className="cv-container">
        <div className="cv-page">
            {/* Header - EXACT blue design */}
            <div className="section-margin-bottom">
                <div className="header-blue-box">
                    <div className="header-form-text">
                        FORM TECH-6 (CONTINUED)
                    </div>
                    <div className="header-cv-title">
                        CURRICULUM VITAE (CV)
                    </div>
                </div>
            </div>

            {/* Personal Information Section - EXACT gray background */}
            <div className="personal-info-section">
                <div className="personal-info-row">
                    <span className="personal-info-label">
                        Position Title and No.:
                    </span>
                    <span className="personal-info-value">{data.proposed_position}</span>
                </div>
                <div className="personal-info-row">
                    <span className="personal-info-label">
                        Name of Expert:
                    </span>
                    <span className="personal-info-value">{data.name}</span>
                </div>
                <div className="personal-info-row">
                    <span className="personal-info-label">
                        Date of Birth:
                    </span>
                    <span className="personal-info-value">{data.date_of_birth}</span>
          </div>
                <div className="personal-info-row">
                    <span className="personal-info-label">
                        Country of Citizenship/ Residence:
                    </span>
                    <span className="personal-info-value">{data.nationality}</span>
          </div>
          </div>

            {/* Education Table - EXACT blue headers */}
            <div className="section-margin-bottom">
                <h3 className="section-title">Education:</h3>
                <table className="cv-table">
            <thead>
                        <tr className="table-header-blue">
                            <th className="table-header-cell">
                                Educational Institutions
                            </th>
                            <th className="table-header-cell">
                                Dates Attended
                            </th>
                            <th className="table-header-cell">
                                Degree (s)/ Diploma (s) Obtained
                            </th>
              </tr>
            </thead>
            <tbody>
                        {data.education.map((edu, idx) => (
                <tr key={idx}>
                                <td className="table-cell">{edu.school_university}</td>
                                <td className="table-cell">{edu.date_obtained}</td>
                                <td className="table-cell">{edu.degree}</td>
                </tr>
              ))}
                        {data.education.length === 0 && (
                            <tr>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                            </tr>
                        )}
            </tbody>
          </table>
          </div>

            {/* Employment Record Table - EXACT design */}
            <div className="section-margin-bottom">
                <h3 className="section-title">
                    Employment Record Relevant to the Assignment
                </h3>
                <table className="cv-table">
                    <thead>
                        <tr className="table-header-blue">
                            <th className="table-header-cell">
                                Period
                            </th>
                            <th className="table-header-cell">
                                Employing Organization and your title/position. Contact Information for references
                            </th>
                            <th className="table-header-cell">
                                Country
                            </th>
                            <th className="table-header-cell">
                                Summary of activities performed relevant to the Assignment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.employment_record.map((emp, idx) => (
                            <tr key={idx}>
                                <td className="table-cell">
                                    {emp.from} - {emp.to}
                                </td>
                                <td className="table-cell">
                                    <div><strong>Employing Organization:</strong> {emp.employer}</div>
                                    <div><strong>Position:</strong> {emp.position}</div>
                                    <div><strong>For References:</strong> {emp.for_references}</div>
                                    <div><strong>Name:</strong> {emp.name}</div>
                                    <div><strong>Designation:</strong> {emp.designation}</div>
                                    <div><strong>Tel:</strong> {emp.telephone}</div>
                                    <div><strong>E-mail:</strong> {emp.email}</div>
                                </td>
                                <td className="table-cell">
                                    {emp.location}
                                </td>
                                <td className="table-cell">
                                    {emp.summary_of_activities}
                                </td>
                            </tr>
                        ))}
                        {data.employment_record.length === 0 && (
                            <tr>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
          </div>

            {/* Membership and Publications */}
            <div className="section-margin-bottom">
                <h3 className="section-title">
                    Membership in Professional Associations and Publications:
                </h3>
                <h4 className="subsection-title">
                    Membership in Professional Associations:
                </h4>
                <div className="subsection-content">
                    {data.membership_in_professional_associations || '-'}
                </div>
                <h4 className="subsection-title">
                    Publications:
                </h4>
                <div className="subsection-content">
                    {data.publications ? (
                        data.publications.split('\n').map((pub, idx) => (
                            <div key={idx} className="list-item">• {pub}</div>
                        ))
                    ) : (
                        '-'
                    )}
                </div>
              </div>

            {/* Language Skills Table */}
            <div className="section-margin-bottom">
                <h3 className="section-title">Languages Skills:</h3>
                <table className="cv-table">
                    <thead>
                        <tr className="table-header-blue">
                            <th className="table-header-cell text-center">
                                Languages
                            </th>
                            <th className="table-header-cell text-center">
                                Speaking
                            </th>
                            <th className="table-header-cell text-center">
                                Reading
                            </th>
                            <th className="table-header-cell text-center">
                                Writing
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.languages.map((lang, idx) => (
                            <tr key={idx}>
                                <td className="table-cell">{lang.language}</td>
                                <td className="table-cell">{lang.speaking}</td>
                                <td className="table-cell">{lang.reading}</td>
                                <td className="table-cell">{lang.writing}</td>
                            </tr>
                        ))}
                        {data.languages.length === 0 && (
                            <tr>
                                <td className="table-cell">XXXXXX</td>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                                <td className="table-cell"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Relevant Trainings */}
            <div className="section-margin-bottom">
                <h3 className="section-title">Relevant Trainings:</h3>
                <div className="subsection-content">
                    {data.other_training ? (
                        data.other_training.split('\n').map((training, idx) => (
                            <div key={idx} className="list-item">• {training}</div>
                        ))
                    ) : (
                        <>
                            <div className="list-item">• XXX</div>
                            <div className="list-item">• XXX</div>
                        </>
                    )}
                </div>
          </div>

            {/* Adequacy for Assignment - EXACT design with border */}
            <div className="section-margin-bottom">
                <h3 className="section-title">
                    Adequacy for the Assignment:
                </h3>
                <table className="cv-table adequacy-table">
            <thead>
                        <tr className="table-header-blue">
                            <th className="table-header-cell adequacy-tasks-col">
                                Detailed Assigned Tasks on Consultant's Team of Experts
                            </th>
                            <th className="table-header-cell adequacy-references-col">
                                Reference to Prior Work / Assignments that Best Illustrates Capability to Handle the Assigned Tasks
                            </th>
              </tr>
            </thead>
            <tbody>
                        <tr>
                            <td className="table-cell adequacy-tasks-cell">
                                {data.detailed_tasks.length > 0 ? (
                                    <ul className="tasks-list">
                                        {data.detailed_tasks.map((task, idx) => (
                                            <li key={idx} className="task-item">{task}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="task-item">• Lead the creation of a comprehensive monitoring and evaluation framework for HELP.</div>
                                )}
                            </td>
                            <td className="table-cell adequacy-references-cell">
                                {data.work_undertaken.map((work, idx) => (
                                    <div key={idx} className="work-item">
                                        <div><strong>Name of assignment or project:</strong> {work.name}</div>
                                        <div><strong>Year:</strong> {work.year}</div>
                                        <div><strong>Location:</strong> {work.location}</div>
                                        <div><strong>Client:</strong> {work.client}</div>
                                        <div><strong>Main Project Features:</strong> {work.main_features}</div>
                                        <div><strong>Position held:</strong> {work.position_held}</div>
                                        <div><strong>Activities performed:</strong> {work.activities}</div>
                                    </div>
                                ))}
                            </td>
                </tr>
            </tbody>
          </table>
            </div>

            {/* Expert's Contact Information */}
            <div className="section-margin-bottom">
                <span className="bold-text">Expert's contact information:</span>
                <span className="contact-spacing"><strong>e-mail: </strong>{data.email}</span>
                <span className="contact-spacing"><strong>phone: </strong>{data.phone}</span>
            </div>

            {/* Certification */}
            <div className="section-margin-bottom">
                <h4 className="subsection-title">Certification:</h4>
                <div className="certification-text">
                    I, the undersigned, certify that to the best of my knowledge and belief, this CV correctly describes myself, my qualifications, and my experience, and I am available, as and when necessary, to undertake the assignment in case of an award. I understand that any misstatement or misrepresentation described herein may lead to my disqualification or dismissal by the Client, and/or sanctions by the Bank.
          </div>
            </div>

            {/* Signature Tables */}
            {/* Signature Section - Simple text and lines only */}
<div className="section-margin-bottom">
  {/* First Signature Block */}
  <div className="simple-signature-block">
    <div className="top-border-line"></div>
    <div className="signature-headers">
      <div className="header-text">Name of Expert</div>
      <span className="header-separator">|</span>
      <div className="header-text">Signature</div>
      <span className="header-separator">|</span>
      <div className="header-text">Date</div>
    </div>
    <div className="underline-lines">
      <div className="underline"></div>
      <div className="underline"></div>
      <div className="underline"></div>
    </div>
  </div>

  {/* Space */}
  <div className="signature-gap"></div>

  {/* Second Signature Block */}
  <div className="simple-signature-block">
    <div className="top-border-line"></div>
    <div className="signature-headers consultant-headers">
      <div className="header-text long-header">Name of authorized Representative of the Consultant (the same who signs the Proposal)</div>
      <span className="header-separator">|</span>
      <div className="header-text">Signature</div>
      <span className="header-separator">|</span>
      <div className="header-text">Date</div>
    </div>
    <div className="underline-lines">
      <div className="underline long-underline"></div>
      <div className="underline"></div>
      <div className="underline"></div>
    </div>
  </div>
</div>

            {/* Footer - EXACT blue design */}
            <div className="cv-footer">
                {/* <div className="footer-left">
                    Conducting Feasibility Study on Potential Export Market for Halal Food from Bangladesh
                </div>
                <div className="footer-right">
                    Page | 5
              </div> */}
            </div>
          </div>
    </div>
));

// DOCX generation - EXACT design matching your backend
const generateDocx = async (cvData: CVData) => {
    const tableBorders = {
        top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        insideVertical: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
    };

    const noBorders = {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
    };

    const doc = new DocxDocument({
        sections: [{
            properties: {},
            children: [
                // Header - EXACT blue design
                new Table({
                    borders: noBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: { fill: "4472C4" },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [
                                                new TextRun({ text: "FORM TECH-6 (CONTINUED)", color: "FFFFFF", bold: true, size: 24 }),
                                            ],
                                        }),
                                        new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [
                                                new TextRun({ text: "CURRICULUM VITAE (CV)", color: "FFFFFF", bold: true, size: 24 }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Personal Information Section - EXACT gray background
                new Table({
                    borders: noBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: { fill: "E7E6E6" },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "Position Title and No.: ", bold: true }),
                                                new TextRun(cvData.proposed_position),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: { fill: "E7E6E6" },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "Name of Expert: ", bold: true }),
                                                new TextRun(cvData.name),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: { fill: "E7E6E6" },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "Date of Birth: ", bold: true }),
                                                new TextRun(cvData.date_of_birth),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    shading: { fill: "E7E6E6" },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "Country of Citizenship/ Residence: ", bold: true }),
                                                new TextRun(cvData.nationality),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Education Table
                new Paragraph({
                    children: [new TextRun({ text: "Education:", bold: true, size: 28 })],
                }),
                new Table({
                    borders: tableBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Educational Institutions", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Dates Attended", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Degree (s)/ Diploma (s) Obtained", color: "FFFFFF", bold: true })] })],
                                }),
                            ],
                        }),
                        ...(cvData.education.length > 0
                            ? cvData.education.map(edu =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(edu.school_university)] }),
                                        new TableCell({ children: [new Paragraph(edu.date_obtained)] }),
                                        new TableCell({ children: [new Paragraph(edu.degree)] }),
                                    ],
                                })
                            )
                            : [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                    ],
                                }),
                            ]
                        ),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Employment Record Table
                new Paragraph({
                    children: [new TextRun({ text: "Employment Record Relevant to the Assignment", bold: true, size: 28 })],
                }),
                new Table({
                    borders: tableBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Period", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Employing Organization and your title/position. Contact Information for references", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Country", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Summary of activities performed relevant to the Assignment", color: "FFFFFF", bold: true })] })],
                                }),
                            ],
                        }),
                        ...(cvData.employment_record.length > 0
                            ? cvData.employment_record.map(emp =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(`${emp.from} - ${emp.to}`)] }),
                                        new TableCell({
                                            children: [
                                                new Paragraph({ children: [new TextRun({ text: `Employing Organization: ${emp.employer}`, bold: emp.employer ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `Position: ${emp.position}`, bold: emp.position ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `For References: ${emp.for_references}`, bold: emp.for_references ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `Name: ${emp.name}`, bold: emp.name ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `Designation: ${emp.designation}`, bold: emp.designation ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `Tel: ${emp.telephone}`, bold: emp.telephone ? false : true })] }),
                                                new Paragraph({ children: [new TextRun({ text: `E-mail: ${emp.email}`, bold: emp.email ? false : true })] }),
                                            ],
                                        }),
                                        new TableCell({ children: [new Paragraph(emp.location)] }),
                                        new TableCell({ children: [new Paragraph(emp.summary_of_activities)] }),
                                    ],
                                })
                            )
                            : [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                    ],
                                }),
                            ]
                        ),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Membership and Publications
                new Paragraph({
                    children: [new TextRun({ text: "Membership in Professional Associations and Publications:", bold: true, size: 28 })],
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Membership in Professional Associations:", bold: true, size: 24 })],
                }),
                new Paragraph(cvData.membership_in_professional_associations || "-"),
                new Paragraph({
                    children: [new TextRun({ text: "Publications:", bold: true, size: 24 })],
                }),
                ...(cvData.publications
                    ? cvData.publications.split('\n').map(pub => new Paragraph({ children: [new TextRun(`• ${pub}`)] }))
                    : [new Paragraph("-")]
                ),

                // Spacing
                new Paragraph({ text: "" }),

                // Languages Table
                new Paragraph({
                    children: [new TextRun({ text: "Languages Skills:", bold: true, size: 28 })],
                }),
                new Table({
                    borders: tableBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Languages", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Speaking", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Reading", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Writing", color: "FFFFFF", bold: true })] })],
                                }),
                            ],
                        }),
                        ...(cvData.languages.length > 0
                            ? cvData.languages.map(lang =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(lang.language)] }),
                                        new TableCell({ children: [new Paragraph(lang.speaking)] }),
                                        new TableCell({ children: [new Paragraph(lang.reading)] }),
                                        new TableCell({ children: [new Paragraph(lang.writing)] }),
                                    ],
                                })
                            )
                            : [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph("XXXXXX")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                        new TableCell({ children: [new Paragraph("")] }),
                                    ],
                                }),
                            ]
                        ),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Relevant Trainings
                new Paragraph({
                    children: [new TextRun({ text: "Relevant Trainings:", bold: true, size: 28 })],
                }),
                ...(cvData.other_training
                    ? cvData.other_training.split('\n').map(training => new Paragraph({ children: [new TextRun(`• ${training}`)] }))
                    : [
                        new Paragraph({ children: [new TextRun("• XXX")] }),
                        new Paragraph({ children: [new TextRun("• XXX")] }),
                    ]
                ),

                // Spacing
                new Paragraph({ text: "" }),

                // Adequacy for Assignment
                new Paragraph({
                    children: [new TextRun({ text: "Adequacy for the Assignment:", bold: true, size: 28 })],
                }),
                new Table({
                    borders: tableBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Detailed Assigned Tasks on Consultant's Team of Experts", color: "FFFFFF", bold: true })] })],
                                }),
                                new TableCell({ 
                                    shading: { fill: "4472C4" },
                                    children: [new Paragraph({ children: [new TextRun({ text: "Reference to Prior Work / Assignments that Best Illustrates Capability to Handle the Assigned Tasks", color: "FFFFFF", bold: true })] })],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ 
                                    children: [
                                        ...(cvData.detailed_tasks.length > 0
                                            ? cvData.detailed_tasks.map(task => new Paragraph({
                                                children: [new TextRun(`• ${task}`)],
                                            }))
                                            : [new Paragraph({
                                                children: [new TextRun("• Lead the creation of a comprehensive monitoring and evaluation framework for HELP.")],
                                            })]
                                        ),
                                    ],
                                }),
                                new TableCell({ 
                                    children: [
                                        ...cvData.work_undertaken.flatMap((work, idx) => [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Name of assignment or project: ", bold: true }),
                                                    new TextRun(work.name),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Year: ", bold: true }),
                                                    new TextRun(work.year),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Location: ", bold: true }),
                                                    new TextRun(work.location),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Client: ", bold: true }),
                                                    new TextRun(work.client),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Main Project Features: ", bold: true }),
                                                    new TextRun(work.main_features),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Position held: ", bold: true }),
                                                    new TextRun(work.position_held),
                                                ],
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "Activities performed: ", bold: true }),
                                                    new TextRun(work.activities),
                                                ],
                                            }),
                                            ...(idx < cvData.work_undertaken.length - 1 ? [new Paragraph({ text: "" })] : [])
                                        ]),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Expert's Contact Information
                new Paragraph({
                    children: [
                        new TextRun({ text: "Expert's contact information: ", bold: true }),
                        new TextRun({ text: `e-mail: ${cvData.email}`, bold: true }),
                        new TextRun({ text: `   phone: ${cvData.phone}`, bold: true }),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Certification
                new Paragraph({
                    children: [new TextRun({ text: "Certification:", bold: true, size: 24 })],
                }),
                new Paragraph({
                    children: [
                        new TextRun("I, the undersigned, certify that to the best of my knowledge and belief, this CV correctly describes myself, my qualifications, and my experience, and I am available, as and when necessary, to undertake the assignment in case of an award. I understand that any misstatement or misrepresentation described herein may lead to my disqualification or dismissal by the Client, and/or sanctions by the Bank."),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),
                new Paragraph({ text: "" }),

                // Signature Section - First Block
                new Paragraph({ text: "" }),  // Spacing

                new Table({
                    borders: noBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [new TextRun({ text: "Name of Expert", bold: true })],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [new TextRun({ text: "Signature", bold: true })],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    width: { size: 33, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.RIGHT,
                                            children: [new TextRun({ text: "Date", bold: true })],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Space between signatures
                new Paragraph({ text: "" }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "" }),

                // Signature Section - Second Block
                new Table({
                    borders: noBorders,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 25, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                                new TableCell({
                                    borders: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                                    width: { size: 25, type: WidthType.PERCENTAGE },
                                    children: [new Paragraph("")],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [new TextRun({ text: "Name of authorized Representative of the Consultant (the same who signs the Proposal)", bold: true })],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    width: { size: 25, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [new TextRun({ text: "Signature", bold: true })],
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    width: { size: 25, type: WidthType.PERCENTAGE },
                                    verticalAlign: VerticalAlign.CENTER,
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.RIGHT,
                                            children: [new TextRun({ text: "Date", bold: true })],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Spacing
                new Paragraph({ text: "" }),

                // Footer (commented in UI, so optional; add if needed)
                // new Table({... blue footer if needed})
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Formatted_CV_${cvData.name.replace(/\s/g, '_') || 'Unnamed'}.docx`);
};

const AutomateCVFormatter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [cvData, setCvData] = useState<CVData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setCvData(initialCVData);
        const handleScroll = () => setIsScrolled(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setError(null);
        setSuccessMessage(null);
        setCvData(null);
    }, []);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const CV_PROCESSING_API_URL = 'http://localhost:8000/api/process-cv/';

    const handleProcessCV = useCallback(async () => {
        if (!file) {
            setError("Please select a DOCX file.");
            return;
        }

        if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setError("Please upload DOCX files only.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // First, test if backend is accessible
            console.log('Testing backend connectivity...');
            try {
                const testResponse = await fetch('http://localhost:8000/', {
                    method: 'GET',
                    mode: 'cors',
                });
                console.log('Backend reachable:', testResponse.status);
            } catch (testErr) {
                console.error('Backend not reachable:', testErr);
                throw new Error('Backend server is not running or not accessible at http://localhost:8000. Please start your Django backend server.');
            }

            const base64Content = await fileToBase64(file);
            const requestBody = { filename: file.name, file_content: base64Content.split(',')[1] };

            console.log('Sending request to:', CV_PROCESSING_API_URL);
            console.log('Request body:', { filename: requestBody.filename, file_content_length: requestBody.file_content.length });

            const response = await fetch(CV_PROCESSING_API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Server Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();
            console.log('Success response:', result);
            
            if (result.success && result.cv_data) {
                const processedCvData: CVData = {
                    ...initialCVData,
                    ...result.cv_data,
                    phone: result.cv_data.expert_contact_information?.phone || "",
                    email: result.cv_data.expert_contact_information?.email || "",
                    relevant_training: result.cv_data.other_training || "",
                    membership_in_professional_associations: Array.isArray(result.cv_data.membership_in_professional_associations)
                        ? result.cv_data.membership_in_professional_associations.join('\n')
                        : result.cv_data.membership_in_professional_associations || "",
                    publications: Array.isArray(result.cv_data.publications)
                        ? result.cv_data.publications.join('\n')
                        : result.cv_data.publications || "",
                    countries_experience: result.cv_data.countries_experience || "",
                    // Ensure arrays are always arrays
                    education: Array.isArray(result.cv_data.education) ? result.cv_data.education : [],
                    languages: Array.isArray(result.cv_data.languages) ? result.cv_data.languages : [],
                    employment_record: Array.isArray(result.cv_data.employment_record) ? result.cv_data.employment_record : [],
                    detailed_tasks: Array.isArray(result.cv_data.detailed_tasks) ? result.cv_data.detailed_tasks : [],
                    work_undertaken: Array.isArray(result.cv_data.work_undertaken) ? result.cv_data.work_undertaken : [],
                };
                setCvData(processedCvData);
                setPreviewMode(true);
                setSuccessMessage("CV data successfully extracted and shown in preview.");
            } else {
                throw new Error(result.message || 'Could not extract data.');
            }
        } catch (err) {
            console.error('Full error:', err);
            let errorMessage = 'Unknown error occurred during data processing.';
            
            if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                errorMessage = 'Cannot connect to backend server. Please ensure your Django backend is running on http://localhost:8000 and has CORS enabled.';
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            
            setError(`Processing failed: ${errorMessage}`);
            setCvData(initialCVData);
        } finally {
            setLoading(false);
        }
    }, [file]);

    const handleDownloadDocx = useCallback(async () => {
        if (!cvData) {
            setError("No CV data available for download.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await generateDocx(cvData);
            setSuccessMessage("CV file successfully downloaded!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred during download.';
            setError(`Download failed. Details: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, [cvData]);

    const isProcessingDisabled = useMemo(() => !file || loading, [file, loading]);
    const isDownloadDisabled = useMemo(() => loading || !cvData, [loading, cvData]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">
                    World Bank CV Format Automation
                </h1>
                <p className="app-description">
                    Upload your DOCX CV and get it formatted in the exact World Bank FORM TECH-6 template design.
                </p>
            </header>
            
            <div className="upload-section">
                <div className="upload-card">
                    <div className="upload-header">
                        <h2>Upload Your CV</h2>
                        <p className="upload-subtitle">Transform your CV into the World Bank FORM TECH-6 format.</p>
                        <button
                            onClick={async () => {
                                setError(null);
                                setSuccessMessage(null);
                                
                                try {
                                    console.log('Testing backend connection...');
                                    
                                    // Test 1: Basic connectivity
                                    const basicTest = await fetch('http://localhost:8000/', {
                                        method: 'GET',
                                        mode: 'cors',
                                    });
                                    console.log('Basic connectivity test:', basicTest.status);
                                    
                                    // Test 2: API endpoint OPTIONS
                                    const optionsTest = await fetch('http://localhost:8000/api/process-cv/', {
                                        method: 'OPTIONS',
                                        mode: 'cors',
                                        headers: { 
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        }
                                    });
                                    console.log('OPTIONS test:', optionsTest.status);
                                    
                                    // Test 3: Check CORS headers
                                    const corsHeaders = {
                                        'Access-Control-Allow-Origin': optionsTest.headers.get('Access-Control-Allow-Origin'),
                                        'Access-Control-Allow-Methods': optionsTest.headers.get('Access-Control-Allow-Methods'),
                                        'Access-Control-Allow-Headers': optionsTest.headers.get('Access-Control-Allow-Headers'),
                                    };
                                    console.log('CORS headers:', corsHeaders);
                                    
                                    setSuccessMessage(`✅ Backend is accessible! Status: ${basicTest.status}, OPTIONS: ${optionsTest.status}. CORS configured: ${corsHeaders['Access-Control-Allow-Origin'] ? 'Yes' : 'No'}`);
                                    
                                } catch (err) {
                                    console.error('Connection test failed:', err);
                                    let errorMsg = 'Connection test failed: ';
                                    
                                    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                                        errorMsg += 'Backend server is not running or not accessible. Please start your Django backend on http://localhost:8000';
                                    } else {
                                        errorMsg += err;
                                    }
                                    
                                    setError(errorMsg);
                                }
                            }}
                            className="button-test-connection"
                        >
                            Test Connection
                        </button>
                    </div>
                    <div className="upload-controls">
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                accept=".docx"
                                onChange={handleFileChange}
                                className="file-input"
                                id="cv-upload"
                            />
                            <label htmlFor="cv-upload" className="file-input-label">
                                {file ? file.name : 'Choose or Drop Your DOCX File'}
                            </label>
                        </div>
                        <div className="button-group">
                            <button
                                onClick={handleProcessCV}
                                disabled={isProcessingDisabled}
                                className={isProcessingDisabled ? "button-disabled" : "button-process"}
                            >
                                {loading ? 'Processing...' : 'Extract Data (AI)'}
                            </button>
                            <button
                                onClick={handleDownloadDocx}
                                disabled={isDownloadDisabled}
                                className={isDownloadDisabled ? "button-disabled" : "button-download"}
                            >
                                {loading ? 'Downloading...' : 'Download DOCX'}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="error-message">
                            <strong>Error! </strong>
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="success-message">
                            <strong>Success! </strong>
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>

            {previewMode && cvData && (
                <div className="preview-container">
                    <h2 className="preview-title">
                        Formatted CV Preview (Exact World Bank FORM TECH-6 Design)
                    </h2>
                    <CVDisplay data={cvData} />
                    {isScrolled && (
                        <button onClick={scrollToTop} className="scroll-to-top">
                            ↑
                        </button>
                    )}
                </div>
            )}
            
            <footer className="app-footer">
                <p>Note: DOCX generation uses the exact FORM TECH-6 template design with proper blue headers and layout.</p>
            </footer>
        </div>
    );
};

export default AutomateCVFormatter;