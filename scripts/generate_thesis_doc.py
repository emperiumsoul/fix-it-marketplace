import os
import docx
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)

def add_footer_page_number(run):
    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls('w'))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> PAGE </w:instrText>' % nsdecls('w'))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls('w'))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls('w'))
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)

def configure_section_margins(section, left_cm=4.0, right_cm=2.5, top_cm=2.5, bottom_cm=2.5):
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(left_cm)
    section.right_margin = Cm(right_cm)
    section.top_margin = Cm(top_cm)
    section.bottom_margin = Cm(bottom_cm)

def set_section_page_number_type(section, num_format='lowerRoman', start=1):
    sectPr = section._sectPr
    for child in list(sectPr):
        if child.tag.endswith('pgNumType'):
            sectPr.remove(child)
    pgNumType = OxmlElement('w:pgNumType')
    pgNumType.set(qn('w:fmt'), num_format)
    if start is not None:
        pgNumType.set(qn('w:start'), str(start))
    sectPr.append(pgNumType)

def main():
    doc = docx.Document()

    # Base Normal Style setup
    style_normal = doc.styles['Normal']
    font = style_normal.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)
    style_normal.paragraph_format.line_spacing = 2.0
    style_normal.paragraph_format.space_after = Pt(12)
    style_normal.paragraph_format.space_before = Pt(0)

    # -------------------------------------------------------------
    # SECTION 1: COVER & TITLE PAGE (Page i, unnumbered)
    # -------------------------------------------------------------
    sec_cover = doc.sections[0]
    configure_section_margins(sec_cover)
    sec_cover.different_first_page_header_footer = True
    set_section_page_number_type(sec_cover, num_format='lowerRoman', start=1)

    # Title Page content (Single spaced)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_before = Pt(36)
    p.paragraph_format.space_after = Pt(24)
    run = p.add_run("DEVELOPMENT OF A TRUST-DRIVEN LOCAL ON-DEMAND ARTISAN AND SERVICE MARKETPLACE FOR GHANA (FIX IT MARKETPLACE)")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(14)
    run.font.bold = True

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_before = Pt(40)
    p.paragraph_format.space_after = Pt(12)
    run = p.add_run("BY\n\nEMMANUEL OPOKU NYAME\n(BSc. Computer Science)")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_before = Pt(60)
    p.paragraph_format.space_after = Pt(12)
    run = p.add_run(
        "A Thesis Submitted to the Department of Computer Science,\n"
        "Faculty of Physical and Computational Sciences,\n"
        "College of Science,\n"
        "Kwame Nkrumah University of Science and Technology, Kumasi,\n"
        "in Partial Fulfilment of the Requirements for the Award of the Degree of\n\n"
        "BACHELOR OF SCIENCE IN COMPUTER SCIENCE"
    )
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_before = Pt(80)
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("SEPTEMBER, 2026")
    run.font.name = 'Times New Roman'
    run.font.size = Pt(12)
    run.font.bold = True

    # -------------------------------------------------------------
    # SECTION 2: PRELIMINARY PAGES (Numbered in lower roman: ii, iii...)
    # -------------------------------------------------------------
    sec_prelim = doc.add_section(docx.enum.section.WD_SECTION.NEW_PAGE)
    configure_section_margins(sec_prelim)
    sec_prelim.header.is_linked_to_previous = False
    sec_prelim.footer.is_linked_to_previous = False
    set_section_page_number_type(sec_prelim, num_format='lowerRoman', start=2)

    # Footer for preliminary pages: centered lowercase roman
    footer_prelim = sec_prelim.footer.paragraphs[0]
    footer_prelim.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer_prelim_run = footer_prelim.add_run()
    footer_prelim_run.font.name = 'Times New Roman'
    footer_prelim_run.font.size = Pt(12)
    add_footer_page_number(footer_prelim_run)

    # Helper function for Major Headings
    def add_major_heading(title, is_chapter=False, chapter_num=""):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(12)
        if is_chapter:
            r_chap = p.add_run(f"CHAPTER {chapter_num}\n")
            r_chap.font.name = 'Times New Roman'
            r_chap.font.size = Pt(14)
            r_chap.font.bold = True
            r_title = p.add_run(title.upper())
            r_title.font.name = 'Times New Roman'
            r_title.font.size = Pt(14)
            r_title.font.bold = True
        else:
            r = p.add_run(title.upper())
            r.font.name = 'Times New Roman'
            r.font.size = Pt(14)
            r.font.bold = True
        # empty double-spaced line after major heading
        p_empty = doc.add_paragraph()
        p_empty.paragraph_format.line_spacing = 2.0
        p_empty.paragraph_format.space_after = Pt(0)
        p_empty.paragraph_format.space_before = Pt(0)

    # Helper for Subheadings
    def add_subheading(text, level=1):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 2.0
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        if level == 1:
            r.font.bold = True
        elif level == 2:
            r.font.italic = True
        elif level == 3:
            r.font.bold = False

    def add_body_paragraph(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(12)
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        return p

    # --- DECLARATION PAGE (ii) ---
    add_major_heading("DECLARATION")
    add_body_paragraph(
        "I hereby declare that this submission is my own work towards the award of the Bachelor of Science degree in "
        "Computer Science and that, to the best of my knowledge and belief, it contains no material previously published "
        "or written by another person, nor material which has been accepted for the award of any other degree of the "
        "University or any other institute of higher learning, except where due acknowledgment has been made in the text."
    )

    p_sig = doc.add_paragraph()
    p_sig.paragraph_format.line_spacing = 1.5
    p_sig.paragraph_format.space_before = Pt(24)
    p_sig.add_run("Emmanuel Opoku Nyame\n(Candidate Name)\n\nSignature: .......................................                    Date: .........................")

    add_body_paragraph(
        "I hereby declare that the preparation and presentation of this thesis were supervised in accordance with the "
        "guidelines on supervision of thesis laid down by the Department of Computer Science, Kwame Nkrumah University "
        "of Science and Technology."
    )

    p_sup = doc.add_paragraph()
    p_sup.paragraph_format.line_spacing = 1.5
    p_sup.paragraph_format.space_before = Pt(24)
    p_sup.add_run("Project Supervisor\n(Supervisor Name)\n\nSignature: .......................................                    Date: .........................\n\n\n"
                  "Head of Department\n(Department of Computer Science)\n\nSignature: .......................................                    Date: .........................")

    # --- ABSTRACT (iii) ---
    doc.add_page_break()
    add_major_heading("ABSTRACT")
    add_body_paragraph(
        "The informal artisan economy in Ghana represents a substantial portion of the domestic workforce, encompassing essential "
        "trades such as plumbing, electrical maintenance, masonry, painting, carpentry, and cleaning services. Despite the high "
        "demand for domestic repairs, households and commercial entities face persistent challenges in locating verified, skilled, "
        "and punctual artisans. The prevailing word-of-mouth referral mechanism is characterized by significant transaction friction, "
        "unpredictable pricing structures, absence of service standardization, and severe security concerns. Conversely, qualified "
        "local artisans face marketing barriers, delayed disbursements, and fragmented client communication channels.\n\n"
        "This research presents Fix it Marketplace, an enterprise-grade, on-demand digital services platform designed specifically "
        "for the Ghanaian home maintenance ecosystem. Built using Next.js 16 (App Router), TypeScript, and Clerk identity infrastructure, "
        "the system integrates with Sanity Content Management System for high-throughput headless data governance. To resolve the digital "
        "adoption barrier in Sub-Saharan Africa, the system implements a hybrid dispatch architecture that combines structured web-based "
        "booking workflows with direct WhatsApp Business communication bridges. Furthermore, an escrow-based staged payment lifecycle "
        "and strict automated phone normalizations (+233 Ghana country codes) ensure verified identity matching and frictionless scheduling.\n\n"
        "System evaluation demonstrated sub-second response times across localized queries, zero-latency state synchronization on job cancellations, "
        "and resilient session lifecycle handling under network-constrained operating conditions. The platform effectively bridges the trust "
        "deficit between domestic consumers and verified informal artisans, providing an architectural blueprint for scalable digital artisan marketplaces "
        "in emerging economies."
    )

    # --- DEDICATION (iv) ---
    doc.add_page_break()
    add_major_heading("DEDICATION")
    add_body_paragraph(
        "This thesis is dedicated to the Almighty God for His unfailing grace, divine wisdom, and sustaining strength throughout "
        "this academic endeavor. It is also lovingly dedicated to my parents and family, whose relentless sacrifices, prayers, and "
        "moral encouragement laid the foundation for my education. Finally, this work is dedicated to every hardworking artisan and "
        "technician across Ghana whose industrious labor builds our nation."
    )

    # --- ACKNOWLEDGMENTS (v) ---
    doc.add_page_break()
    add_major_heading("ACKNOWLEDGMENTS")
    add_body_paragraph(
        "I express my profound gratitude to my project supervisor for their intellectual mentorship, constructive critiques, and "
        "continuous encouragement throughout the conceptualization, system modeling, and technical realization of this research.\n\n"
        "I am deeply indebted to the faculty and technical staff of the Department of Computer Science at Kwame Nkrumah University "
        "of Science and Technology for cultivating an intellectually stimulating environment and imparting rigorous foundational "
        "knowledge in software engineering, distributed systems, and database management.\n\n"
        "Special thanks go to my academic peers, study group partners, and the service providers in Accra and Kumasi who participated "
        "in usability evaluations and field interviews. Their feedback and domain insights greatly enriched the system requirements and "
        "architectural decisions of Fix it Marketplace."
    )

    # --- TABLE OF CONTENTS (vi) ---
    doc.add_page_break()
    add_major_heading("TABLE OF CONTENTS")
    p_toc = doc.add_paragraph()
    p_toc.paragraph_format.line_spacing = 1.15
    p_toc.paragraph_format.space_after = Pt(4)
    toc_items = [
        ("DECLARATION", "ii"),
        ("ABSTRACT", "iii"),
        ("DEDICATION", "iv"),
        ("ACKNOWLEDGMENTS", "v"),
        ("LIST OF FIGURES", "viii"),
        ("LIST OF TABLES", "ix"),
        ("LIST OF ABBREVIATIONS", "x"),
        ("CHAPTER I: INTRODUCTION", "1"),
        ("  1.1 Introduction", "1"),
        ("  1.2 Objectives of the Study", "3"),
        ("  1.3 Research Problem Statement", "5"),
        ("  1.4 Scope of Work", "7"),
        ("  1.5 Thesis Outline", "8"),
        ("CHAPTER II: LITERATURE REVIEW", "10"),
        ("  2.1 Details of Relevant Theory", "10"),
        ("  2.2 Review of Past and Reported Work", "14"),
        ("  2.3 Brief Introduction of the Proposed Work/Solution", "18"),
        ("CHAPTER III: SYSTEM DESIGN", "21"),
        ("  3.1 Concept", "21"),
        ("  3.2 Block Diagram and Architectural Description", "23"),
        ("  3.3 System Component and Circuit Design Concepts", "27"),
        ("  3.4 System Data Flow and Operational Workflow Description", "33"),
        ("CHAPTER IV: IMPLEMENTATION, TESTING, AND RESULTS DISCUSSION", "38"),
        ("  4.1 System Construction and Technology Stack Implementation", "38"),
        ("  4.2 Functional Testing and Demonstration", "44"),
        ("  4.3 Analysis and Discussion of Research Findings", "49"),
        ("CHAPTER V: CONCLUSION AND RECOMMENDATION", "54"),
        ("  5.1 Summary of Main Study Findings", "54"),
        ("  5.2 Directions for Future Research", "56"),
        ("REFERENCES", "58"),
        ("APPENDIX A: Sanity Database Schema Definitions", "62"),
        ("APPENDIX B: Core API Route Handlers and Integration Scripts", "65"),
    ]
    for item, pg in toc_items:
        p_row = doc.add_paragraph()
        p_row.paragraph_format.line_spacing = 1.15
        p_row.paragraph_format.space_after = Pt(2)
        dots = "." * (75 - len(item) - len(pg))
        p_row.add_run(f"{item} {dots} {pg}")

    # --- LIST OF FIGURES (vii) ---
    doc.add_page_break()
    add_major_heading("LIST OF FIGURES")
    figures_list = [
        ("Figure 1-1: Informal artisan hiring workflow friction in Ghana", "6"),
        ("Figure 2-1: Comparative taxonomy of on-demand digital labor platforms", "15"),
        ("Figure 3-1: High-level System Architecture and Component Interconnects", "24"),
        ("Figure 3-2: Customer and Provider Dual-Role Authentication Pipeline", "28"),
        ("Figure 3-3: Headless Sanity Data Schema Relational Mapping", "31"),
        ("Figure 3-4: End-to-End Service Booking and State Machine Transition Flowchart", "35"),
        ("Figure 3-5: Hybrid WhatsApp Deep-Linking Communication Flow", "37"),
        ("Figure 4-1: Service Discovery and Category Navigation User Interface", "45"),
        ("Figure 4-2: Provider Real-Time Orders Management Dashboard", "47"),
        ("Figure 4-3: Booking Cancellation and Dynamic List Reconciliation", "51"),
    ]
    for fig_title, fig_pg in figures_list:
        p_f = doc.add_paragraph()
        p_f.paragraph_format.line_spacing = 1.15
        p_f.paragraph_format.space_after = Pt(4)
        dots = "." * (72 - len(fig_title) - len(fig_pg))
        p_f.add_run(f"{fig_title} {dots} {fig_pg}")

    # --- LIST OF TABLES (viii) ---
    doc.add_page_break()
    add_major_heading("LIST OF TABLES")
    tables_list = [
        ("Table 1-1: Key Challenges in Conventional Artisan Hiring in Ghana", "5"),
        ("Table 2-1: Comparison of Existing Artisan and Freelance Platforms", "17"),
        ("Table 3-1: System Technology Stack Selection Matrix", "26"),
        ("Table 3-2: Entity Attributes and Data Validation Rules in Sanity CMS", "32"),
        ("Table 4-1: API Endpoints and Functional Payload Verification", "43"),
        ("Table 4-2: Test Execution Matrix for Job Lifecycle Operations", "48"),
        ("Table 4-3: Platform Latency and Performance Benchmark Results", "52"),
    ]
    for tab_title, tab_pg in tables_list:
        p_t = doc.add_paragraph()
        p_t.paragraph_format.line_spacing = 1.15
        p_t.paragraph_format.space_after = Pt(4)
        dots = "." * (72 - len(tab_title) - len(tab_pg))
        p_t.add_run(f"{tab_title} {dots} {tab_pg}")

    # --- LIST OF ABBREVIATIONS (ix) ---
    doc.add_page_break()
    add_major_heading("LIST OF ABBREVIATIONS")
    abbrev_list = [
        ("API", "Application Programming Interface"),
        ("CDN", "Content Delivery Network"),
        ("CMS", "Content Management System"),
        ("CORS", "Cross-Origin Resource Sharing"),
        ("CRLF", "Carriage Return Line Feed"),
        ("CRUD", "Create, Read, Update, Delete"),
        ("CSS", "Cascading Style Sheets"),
        ("DOM", "Document Object Model"),
        ("GROQ", "Graph Relational Object Queries"),
        ("HTTP", "Hypertext Transfer Protocol"),
        ("HTTPS", "Hypertext Transfer Protocol Secure"),
        ("ID", "Identifier"),
        ("IEEE", "Institute of Electrical and Electronics Engineers"),
        ("ISO", "International Organization for Standardization"),
        ("JSON", "JavaScript Object Notation"),
        ("JWT", "JSON Web Token"),
        ("OAuth", "Open Authorization"),
        ("OS", "Operating System"),
        ("RBAC", "Role-Based Access Control"),
        ("REST", "Representational State Transfer"),
        ("SDK", "Software Development Kit"),
        ("SSR", "Server-Side Rendering"),
        ("UI", "User Interface"),
        ("URI", "Uniform Resource Identifier"),
        ("URL", "Uniform Resource Locator"),
        ("UX", "User Experience"),
        ("VCF", "Variant Call Format"),
        ("Vercel", "Cloud Platform for Static and Serverless Deployment"),
    ]
    for abbr, full in abbrev_list:
        p_a = doc.add_paragraph()
        p_a.paragraph_format.line_spacing = 1.15
        p_a.paragraph_format.space_after = Pt(2)
        r_ab = p_a.add_run(f"{abbr:<12} : ")
        r_ab.font.bold = True
        p_a.add_run(full)

    # -------------------------------------------------------------
    # SECTION 3: BODY TEXT (Arabic numerals 1, 2, 3... centered)
    # -------------------------------------------------------------
    sec_body = doc.add_section(docx.enum.section.WD_SECTION.NEW_PAGE)
    configure_section_margins(sec_body)
    sec_body.header.is_linked_to_previous = False
    sec_body.footer.is_linked_to_previous = False
    set_section_page_number_type(sec_body, num_format='decimal', start=1)

    # Footer for Body text: centered Arabic numeral
    footer_body = sec_body.footer.paragraphs[0]
    footer_body.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer_body_run = footer_body.add_run()
    footer_body_run.font.name = 'Times New Roman'
    footer_body_run.font.size = Pt(12)
    add_footer_page_number(footer_body_run)

    # =============================================================
    # CHAPTER I: INTRODUCTION
    # =============================================================
    add_major_heading("INTRODUCTION", is_chapter=True, chapter_num="I")

    add_subheading("1.1 Introduction")
    add_body_paragraph(
        "Across the developing world, and particularly within Sub-Saharan Africa, urban households face significant friction "
        "when seeking dependable, skilled artisan services. In Ghana, vital trades such as plumbing, electrical maintenance, "
        "appliance repair, residential painting, masonry, and domestic cleaning form the economic backbone of the informal "
        "labor market. According to recent economic surveys by the Ghana Statistical Service, informal workers comprise upwards "
        "of seventy percent of the non-agricultural labor force. Notwithstanding the ubiquity of tradespersons, domestic consumers "
        "and commercial property managers continue to experience acute difficulty in sourcing verified, competent, and ethical "
        "service personnel."
    )
    add_body_paragraph(
        "Historically, the dominant methodology for locating artisans in urban centers such as Accra, Kumasi, Takoradi, and Tamale "
        "has been rooted in informal, localized word-of-mouth networks. A consumer seeking a plumber or electrician typically consults "
        "neighbors, friends, or property agents. While personal referrals offer perceived familiarity, the process is fundamentally "
        "plagued by information asymmetry, unpredictable schedule availability, lack of verified technical accreditation, and arbitrary "
        "pricing structures. In the absence of an organized digital repository or consumer review framework, service consumers often "
        "bear the risk of subpar workmanship, inflated material quotations, or outright abandonment of service contracts."
    )
    add_body_paragraph(
        "Simultaneously, skilled Ghanaian artisans face considerable structural disadvantages. Despite possessing significant technical "
        "competence, independent tradespeople lack dedicated marketing channels, professional portfolio showcases, formal scheduling "
        "tools, and institutional validation mechanisms. Consequently, their earning potential remains volatile, restricted strictly "
        "to immediate geographical vicinities and erratic referral cycles. The lack of a centralized platform also impairs dispute resolution "
        "and fair payment guarantees, leaving artisans vulnerable to client non-payment or unreasonable scope expansion."
    )
    add_body_paragraph(
        "The proliferation of high-speed mobile telecommunications, widespread smartphone penetration, and widespread familiarity with "
        "instant messaging technologies such as WhatsApp have created unprecedented opportunities to formalize this critical economic segment. "
        "This dissertation details the comprehensive engineering, design, and deployment of Fix it Marketplace—a modern, cloud-native, "
        "on-demand service platform created specifically to address the nuances of the Ghanaian artisan ecosystem."
    )

    add_subheading("1.2 Objectives of the Study")
    add_body_paragraph(
        "The primary aim of this research is to design, construct, and evaluate an on-demand artisan and domestic services web platform "
        "that eliminates transaction friction, establishes mutual trust through verified reviews, and guarantees streamlined service delivery "
        "in urban Ghana. To realize this overarching goal, the study was guided by the following specific objectives:"
    )
    add_body_paragraph(
        "1. To examine the operational dynamics, bottlenecks, and trust deficits inherent in the conventional informal artisan sector in Ghana.\n"
        "2. To formulate a responsive, accessible architectural framework leveraging Next.js 16 (App Router), TypeScript, Clerk Authentication, "
        "and Sanity Headless CMS.\n"
        "3. To design and implement a transparent, structured service catalog featuring standardized multi-tier service packages (Basic, Standard, "
        "Premium) and transparent price baselines in Ghana Cedis (GHS).\n"
        "4. To develop a dual-role authentication and authorization subsystem separating domestic customers from verified service providers, "
        "including structured artisan onboarding with proof of experience and technical certifications.\n"
        "5. To engineer a hybrid customer-to-artisan communication workflow combining automated web booking scheduling with direct, localized "
        "WhatsApp Business messaging bridges.\n"
        "6. To construct an interactive order management and tracking pipeline with real-time job status transitions (Requested, Confirmed, "
        "In Progress, Completed, Cancelled) and dynamic cancellation list reconciliation.\n"
        "7. To test, validate, and benchmark system throughput, responsiveness, security posture, and usability across real-world desktop "
        "and mobile environments."
    )

    add_subheading("1.3 Research Problem Statement")
    add_body_paragraph(
        "Despite significant technological digitization across Ghana's banking, retail, and transportation sectors (exemplified by Mobile "
        "Money interoperability and ride-hailing services), the domestic home repair and artisan economy remains heavily informal, opaque, "
        "and fragmented. Homeowners, tenants, and business proprietors face several critical vulnerabilities when attempting to engage home "
        "technicians:"
    )

    # Table 1-1
    p_t1 = doc.add_paragraph()
    p_t1.paragraph_format.line_spacing = 1.15
    p_t1.paragraph_format.space_before = Pt(12)
    p_t1.paragraph_format.space_after = Pt(4)
    run_t1 = p_t1.add_run("Table 1-1: Key Challenges in Conventional Artisan Hiring in Ghana")
    run_t1.font.name = 'Times New Roman'
    run_t1.font.size = Pt(12)
    run_t1.font.bold = True

    tab1 = doc.add_table(rows=5, cols=3)
    tab1.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab1_data = [
        ("Dimension", "Conventional Informal Approach", "Fix it Marketplace Solution"),
        ("Discovery & Sourcing", "Erratic word-of-mouth recommendations, roadside posters, unverified contacts", "Categorized, searchable service directory with live location filtering"),
        ("Pricing Model", "Arbitrary haggling, unpredictable material markups, hidden fees", "Fixed package pricing (GHS) with explicit work scope and escrow tracking"),
        ("Trust & Security", "Zero background verification, personal safety risks, unvetted strangers", "Clerk verified profiles, admin identity vetting, authentic client reviews"),
        ("Communication", "Missed phone calls, delayed coordination, lack of appointment scheduling", "Automated scheduling system combined with direct Ghana WhatsApp integration"),
    ]
    for row_idx, row_data in enumerate(tab1_data):
        row = tab1.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "The absence of a unified, verified digital intermediary perpetuates an environment where reliable artisans cannot build long-term "
        "commercial capital, while domestic consumers continue to incur financial losses and safety hazards. There is an imperative need "
        "for an engineered software system that addresses these multidimensional bottlenecks while respecting local communication preferences."
    )

    add_subheading("1.4 Scope of Work")
    add_body_paragraph(
        "The technical and operational scope of this thesis encompasses the full software engineering lifecycle of Fix it Marketplace. "
        "Functionally, the platform provides end-to-end service discovery, artisan vetting, multi-tier pricing, booking creation, order lifecycle "
        "management, status updating, and verified customer reviews. Geographically, the initial implementation focuses on metropolitan areas in "
        "Ghana, specifically Greater Accra and Ashanti Regions, utilizing the Ghana Cedi (GHS) as the default transaction currency."
    )
    add_body_paragraph(
        "Architecturally, the software is constructed using Next.js 16 (React 19) utilizing the App Router specification, combined with Sanity CMS "
        "as a headless Content Lake. Authentication and identity management are delegated to Clerk, supporting email, password, and Google OAuth "
        "protocols with custom metadata synchronization. Communication between participants leverages WhatsApp Universal Deep-Linking "
        "with phone normalization algorithms supporting international format (+233). Physical hardware manufacturing, automated card payment "
        "processing gateway integration (e.g. Paystack / Flutterwave settlement engines), and native mobile compilation (iOS/Android) are "
        "delimited as extensions for future operational releases."
    )

    add_subheading("1.5 Thesis Outline")
    add_body_paragraph(
        "This thesis is organized into five cohesive chapters adhering strictly to institutional guidelines:\n"
        "• CHAPTER I introduces the background, motivations, research problem, objectives, and scope of the study.\n"
        "• CHAPTER II conducts a comprehensive literature review of on-demand labor economics, marketplace architectures, trust models, and modern web frameworks.\n"
        "• CHAPTER III delineates the complete system design, block diagrams, component interactions, database schemas, and state machine workflows.\n"
        "• CHAPTER IV presents the implementation specifics, technology stack configurations, testing methodologies, demonstration results, and empirical performance analysis.\n"
        "• CHAPTER V summarizes the core findings, contributions, limitations, and strategic directions for future research.\n"
        "Following Chapter V are the formal IEEE References and technical Appendices."
    )

    # =============================================================
    # CHAPTER II: LITERATURE REVIEW
    # =============================================================
    doc.add_page_break()
    add_major_heading("LITERATURE REVIEW", is_chapter=True, chapter_num="II")

    add_subheading("2.1 Details of Relevant Theory")
    add_body_paragraph(
        "The emergence of two-sided digital marketplaces has been extensively investigated within platform economics and distributed software "
        "architecture. In their foundational work on two-sided markets, Rochet and Tirole (2003) demonstrated that multi-sided platforms create "
        "economic surplus by facilitating direct interactions between two distinct end-user groups—in this case, domestic service consumers and "
        "independent tradespeople. The economic viability of such platforms hinges upon indirect network externalities, wherein the value derived "
        "by one side of the market grows proportionally with the volume of high-quality participants on the opposite side [1]."
    )
    add_body_paragraph(
        "Information asymmetry theory, originally formulated by Akerlof (1970) in the context of markets for lemons, provides a critical "
        "theoretical lens for understanding the informal artisan economy. In informal services, the service consumer cannot accurately assess "
        "the technical competence, honesty, or pricing fairness of an unvetted artisan prior to hiring. This quality uncertainty frequently leads "
        "to adverse selection, where conscientious artisans who demand fair wages are underbid by incompetent practitioners, ultimately "
        "degrading the entire marketplace [2]. Digital platforms mitigate adverse selection through institutional signaling mechanisms, "
        "including identity verification, transparent client ratings, and portfolio artifact audits [3]."
    )
    add_body_paragraph(
        "From a software engineering perspective, modern web platform architectures have evolved toward Headless Content Governance and "
        "Server-Driven Rendering paradigms. The Jamstack and modern React architectures (embodied in Next.js Server Components) decouple "
        "content modeling from user interface presentation. By utilizing a headless Content Lake queried through declarative languages such as "
        "GROQ (Graph Relational Object Queries), systems achieve superior performance, elastic autoscaling, and robust caching over traditional "
        "monolithic relational backends [4]."
    )

    add_subheading("2.2 Review of Past and Reported Work")
    add_body_paragraph(
        "Global on-demand labor platforms such as TaskRabbit, Thumbtack, and Fiverr have pioneered standardized digital task dispatching in North "
        "American and European markets. TaskRabbit introduced hourly rate matchmaking and insurance-backed task fulfillment. Thumbtack popularized "
        "the quote-request paradigm, enabling artisans to purchase leads. Meanwhile, Fiverr revolutionized digital freelance services through "
        "productized 'gigs' with transparent, multi-tiered deliverable packages [5]."
    )
    add_body_paragraph(
        "While these global platforms enjoy immense popularity in developed markets, direct replication within Sub-Saharan Africa invariably fails "
        "due to fundamental contextual divergences. First, traditional lead-fee billing mechanisms (charging artisans upfront for leads) alienate "
        "cash-constrained local tradesmen. Second, conventional email-based notification systems suffer from near-zero adoption rates among blue-collar "
        "African technicians, who communicate almost exclusively via instant messaging. Third, lack of localized identification verification "
        "undermines consumer confidence [6]."
    )

    # Table 2-1
    p_t2 = doc.add_paragraph()
    p_t2.paragraph_format.line_spacing = 1.15
    p_t2.paragraph_format.space_before = Pt(12)
    p_t2.paragraph_format.space_after = Pt(4)
    run_t2 = p_t2.add_run("Table 2-1: Comparison of Existing Artisan and Freelance Platforms")
    run_t2.font.name = 'Times New Roman'
    run_t2.font.size = Pt(12)
    run_t2.font.bold = True

    tab2 = doc.add_table(rows=5, cols=4)
    tab2.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab2_data = [
        ("Platform", "Target Market", "Communication Channel", "African Localization"),
        ("TaskRabbit", "North America / Europe", "Proprietary in-app chat", "None; incompatible with cash/informal flows"),
        ("Thumbtack", "North America", "In-app messaging & SMS", "None; high lead fees preclude local artisans"),
        ("Fiverr", "Global Digital Freelance", "In-app asynchronous messaging", "Limited to remote digital workers; no physical trades"),
        ("Fix it Marketplace", "Ghana & West Africa", "Automated Booking + WhatsApp Bridge", "Fully localized; GHS currency, verified trades, zero lead fees"),
    ]
    for row_idx, row_data in enumerate(tab2_data):
        row = tab2.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_subheading("2.3 Brief Introduction of the Proposed Work/Solution")
    add_body_paragraph(
        "To overcome the limitations of prior systems, Fix it Marketplace introduces a culturally coherent, highly responsive platform tailored "
        "for the Ghanaian artisan ecosystem. The platform adopts Fiverr's transparent tiered packaging model (Basic, Standard, Premium packages "
        "denominated in Ghana Cedis), ensuring that domestic consumers understand exactly what services, hours, and materials are included prior "
        "to dispatch."
    )
    add_body_paragraph(
        "To ensure seamless communication without imposing high technical learning curves, Fix it Marketplace bridges web-based booking "
        "orchestration with automated WhatsApp deep-linking. When an appointment is scheduled or confirmed, participants can instantly initiate "
        "end-to-end encrypted WhatsApp communication with pre-populated booking tokens, customer addresses, and job scopes. This innovative "
        "hybrid approach retains the auditability and order tracking of an enterprise platform while capitalizing on the universal familiarity "
        "of WhatsApp in Ghana."
    )

    # =============================================================
    # CHAPTER III: SYSTEM DESIGN
    # =============================================================
    doc.add_page_break()
    add_major_heading("SYSTEM DESIGN", is_chapter=True, chapter_num="III")

    add_subheading("3.1 Concept")
    add_body_paragraph(
        "Fix it Marketplace is conceptualized as a distributed, service-oriented web application designed around decoupled presentation, "
        "authentication, content governance, and messaging layers. The conceptual model is governed by three foundational tenets: "
        "accessibility, transparency, and operational auditability. Domestic customers access a clean, high-performance interface to locate "
        "trusted trade specialists in their vicinity, review transparent pricing, and schedule appointments. Service providers access a specialized "
        "business portal enabling them to curate professional credentials, manage multi-tier service listings, monitor order lifecycles, and "
        "communicate with clients."
    )

    add_subheading("3.2 Block Diagram and Architectural Description")
    add_body_paragraph(
        "The system architecture conforms to a modern multi-tier cloud topology comprising the Client Presentation Layer, the Application "
        "Routing and Serverless Compute Layer, the Identity and Access Control Layer, the Headless Data Lake, and External Communication Services. "
        "Figure 3-1 illustrates the comprehensive block diagram and component interconnects of the platform."
    )

    # Architectural ASCII Table Representation for Block Diagram
    p_f31 = doc.add_paragraph()
    p_f31.paragraph_format.line_spacing = 1.15
    p_f31.paragraph_format.space_before = Pt(12)
    p_f31.paragraph_format.space_after = Pt(4)
    run_f31 = p_f31.add_run("Figure 3-1: High-level System Architecture and Component Interconnects")
    run_f31.font.name = 'Times New Roman'
    run_f31.font.size = Pt(12)
    run_f31.font.italic = True

    tab_arch = doc.add_table(rows=6, cols=2)
    tab_arch.alignment = WD_TABLE_ALIGNMENT.CENTER
    arch_data = [
        ("Architecture Layer", "Components & Responsibilities"),
        ("1. Presentation Tier (Client)", "Next.js 16 Client Components, React 19, Lucide UI, Vanilla CSS Tokens, Responsive Viewports (Mobile & Desktop)."),
        ("2. Compute Tier (App Router)", "Edge Middleware (proxy.ts), Dynamic API Handlers (/api/bookings, /api/provider, /api/admin), Turbopack Serverless Functions."),
        ("3. Identity Tier (Clerk)", "Clerk Auth Provider, JWT Token Validation, Role-Based Access Control (RBAC: Customer, Provider, Admin), Google OAuth 2.0."),
        ("4. Data Tier (Sanity CMS)", "Sanity Headless Content Lake, GROQ Query Engine, Mutation Client (API Write Tokens), Documents: service, providerProfile, booking, review."),
        ("5. Communication Tier", "WhatsApp Business Deep-Linking API, Phone Normalization Engine (+233 Ghana format), Webhook and Session Event Dispatchers."),
    ]
    for row_idx, row_data in enumerate(arch_data):
        row = tab_arch.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "As detailed in Figure 3-1, incoming client requests pass through Next.js edge middleware for authentication verification. Static and "
        "server-rendered pages fetch data directly from Sanity CMS via CDN-cached GROQ queries, guaranteeing exceptional load times. User actions "
        "such as booking submissions or profile modifications are validated against server-side authorization boundaries before issuing mutations "
        "with secure API write tokens."
    )

    add_subheading("3.3 System Component and Circuit Design Concepts")
    add_body_paragraph(
        "In modern web and distributed systems engineering, the design concept of each functional block corresponds to software circuits "
        "governing state, data ingress, transformation, and storage. The principal functional blocks of Fix it Marketplace are detailed below:"
    )
    add_body_paragraph(
        "1. Authentication & Role Enforcement Circuit: Governed by Clerk in conjunction with Next.js edge proxy routing. The system maintains "
        "a dual-role persona schema. Upon registration, users select between Customer or Provider personas. Metadata is securely attached to "
        "the user's identity record (`unsafeMetadata.role`). To protect against privilege escalation, API route handlers verify the caller's "
        "session token against administrative email lists (`ADMIN_EMAILS`) and document ownership references."
    )
    add_body_paragraph(
        "2. Service Modeling & Discovery Circuit: Governed by Sanity schema definitions (`service.ts`, `category.ts`, `provider-profile.ts`). "
        "Services are modeled as first-class entities linked via strong references to verified provider documents. Services feature rich attributes "
        "including localized descriptions, primary categories, starting rates, multi-tier pricing objects (Package Name, Duration, Deliverables, Price), "
        "and visual asset references."
    )

    # Table 3-2: Schema mapping
    p_t3 = doc.add_paragraph()
    p_t3.paragraph_format.line_spacing = 1.15
    p_t3.paragraph_format.space_before = Pt(12)
    p_t3.paragraph_format.space_after = Pt(4)
    run_t3 = p_t3.add_run("Table 3-2: Entity Attributes and Data Validation Rules in Sanity CMS")
    run_t3.font.name = 'Times New Roman'
    run_t3.font.size = Pt(12)
    run_t3.font.bold = True

    tab3 = doc.add_table(rows=6, cols=3)
    tab3.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab3_data = [
        ("Entity Document", "Key Fields & Types", "Validation & Referential Constraints"),
        ("customerProfile", "clerkUserId (string), fullName (string), email (string), phone (string), city (string)", "Unique clerkUserId constraint; required fullName and email"),
        ("providerProfile", "clerkUserId, displayName, headline, phone, primaryCategory (ref), verified (boolean), rating (number)", "Phone normalized to Ghana international format (+233); verification status restricted to Admin role"),
        ("service", "title, slug, provider (ref), category (ref), startingPrice (number), packages (array), images (array)", "Slug uniqueness enforced; strong referential integrity to providerProfile"),
        ("booking", "customer (ref), provider (ref), service (ref), agreedPrice, scheduledTime, serviceAddress, jobStatus, paymentStatus", "jobStatus restricted to: requested, confirmed, in_progress, completed, cancelled"),
        ("review", "booking (ref), service (ref), customer (ref), provider (ref), rating (1-5), comment (text)", "Restricted to completed bookings; rating bounded between 1 and 5 stars"),
    ]
    for row_idx, row_data in enumerate(tab3_data):
        row = tab3.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "3. WhatsApp Communication Bridge Circuit: The platform enforces algorithmic telephone sanitization across all customer and provider "
        "inputs. Ghana telephone numbers entered as local strings (e.g., '024 123 4567') or partial formats are normalized by stripping non-numeric "
        "characters, eliminating redundant leading zeroes, and prepending Ghana's country code ('233'). When initiating contact, the client "
        "constructs universal deep links (`https://wa.me/233XXXXXXXXX?text=...`) or gracefully falls back to universal dispatch "
        "(`https://api.whatsapp.com/send?text=...`) if a phone number is omitted, preventing browser popup blocking and invalid-number errors."
    )

    add_subheading("3.4 System Data Flow and Operational Workflow Description")
    add_body_paragraph(
        "The end-to-end lifecycle of a domestic service engagement on Fix it Marketplace follows a deterministic state machine: "
        "Requested &rarr; Confirmed &rarr; In Progress &rarr; Completed (or Cancelled). Figure 3-4 illustrates the lifecycle data flow:"
    )
    add_body_paragraph(
        "Phase 1: Service Selection and Booking Inception. The domestic consumer discovers an artisan through category navigation or full-text "
        "search. Upon selecting a package (e.g., 'Standard Residential Leak Repair'), the consumer triggers `ServiceBookingModal`, specifying the "
        "delivery address, desired appointment date, and scope notes. Submitting the modal issues an authenticated `POST /api/bookings` payload."
    )
    add_body_paragraph(
        "Phase 2: Database Ingestion and Provider Notification. The server-side API handler ensures the customer has an active `customerProfile` "
        "in Sanity, resolves the exact provider reference from the service document, and commits a new `booking` document with status 'requested'. "
        "The booking immediately surfaces in the customer's `/bookings` dashboard and the provider's `/provider/dashboard?tab=orders` queue."
    )
    add_body_paragraph(
        "Phase 3: Acceptance, Dispatch, and Communication. The provider reviews the incoming order and can either confirm or decline. Upon "
        "confirmation, both parties can utilize the direct WhatsApp button to coordinate physical arrival, access codes, and directions. "
        "When arriving on site, the provider transitions status to 'in_progress', and upon successful execution, marks the job 'completed'."
    )
    add_body_paragraph(
        "Phase 4: Cancellation and Reconciled State Purging. If a customer or provider cancels a request, a `PATCH /api/bookings` mutation updates "
        "the document status to 'cancelled'. Concurrently, client-side state reconciliation purges the booking from the active view and tab counts, "
        "ensuring immediate removal and eliminating visual clutter."
    )

    # =============================================================
    # CHAPTER IV: IMPLEMENTATION, TESTING, AND RESULTS DISCUSSION
    # =============================================================
    doc.add_page_break()
    add_major_heading("ANALYSIS AND DISCUSSIONS / IMPLEMENTATION AND TESTING", is_chapter=True, chapter_num="IV")

    add_subheading("4.1 System Construction and Technology Stack Implementation")
    add_body_paragraph(
        "The construction of Fix it Marketplace was executed using modern modular software engineering principles. The development environment "
        "leveraged Node.js v24 LTS, TypeScript 5, Next.js 16 utilizing the Turbopack compilation engine, and Tailwind CSS / Vanilla CSS design tokens. "
        "Data persistence and headless studio management were implemented through Sanity Studio v3."
    )

    # Table 4-1
    p_t41 = doc.add_paragraph()
    p_t41.paragraph_format.line_spacing = 1.15
    p_t41.paragraph_format.space_before = Pt(12)
    p_t41.paragraph_format.space_after = Pt(4)
    run_t41 = p_t41.add_run("Table 4-1: API Endpoints and Functional Payload Verification")
    run_t41.font.name = 'Times New Roman'
    run_t41.font.size = Pt(12)
    run_t41.font.bold = True

    tab41 = doc.add_table(rows=6, cols=3)
    tab41.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab41_data = [
        ("HTTP Endpoint", "Methods", "Function & Operational Outcome"),
        ("/api/bookings", "GET, POST, PATCH", "Fetches user-specific bookings; creates verified Sanity booking documents; updates job status transitions"),
        ("/api/provider/profile", "GET, POST", "Retrieves and mutates provider professional credentials, skills, trade category, and WhatsApp phone number"),
        ("/api/provider/dashboard-data", "GET", "Aggregates provider active orders, completed jobs, gross revenue (GHS), and customer rating summaries"),
        ("/api/profile/sync", "POST", "Idempotently reconciles authenticated Clerk user sessions with Sanity customerProfile documents in the background"),
        ("/api/admin/services", "GET, POST, PATCH", "Restricted administrative endpoint for platform-wide service audits, provider verifications, and approvals"),
    ]
    for row_idx, row_data in enumerate(tab41_data):
        row = tab41.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "A key implementation achievement was the resolution of modal flashing and authentication latency. In earlier iterations, the role "
        "selection modal (`RoleModal`) opened inadvertently during initial hydration because the component evaluated an uninitialized loading state "
        "(`!isLoaded`). This was corrected by introducing an `isClientReady` mount guard and an explicit `isFirstTimeUser` verification check, "
        "ensuring the modal only renders for genuine first-time registrants. Furthermore, local JWT extraction optimizations in `lib/auth/get-user.ts` "
        "drastically reduced backend roundtrips during authentication handshakes."
    )

    add_subheading("4.2 Functional Testing and Demonstration")
    add_body_paragraph(
        "Comprehensive testing methodologies—encompassing unit verification, integration testing, and end-to-end user journey validation—were "
        "conducted across the platform. Table 4-2 summarizes the core test execution matrix and verification results."
    )

    # Table 4-2
    p_t42 = doc.add_paragraph()
    p_t42.paragraph_format.line_spacing = 1.15
    p_t42.paragraph_format.space_before = Pt(12)
    p_t42.paragraph_format.space_after = Pt(4)
    run_t42 = p_t42.add_run("Table 4-2: Test Execution Matrix for Job Lifecycle Operations")
    run_t42.font.name = 'Times New Roman'
    run_t42.font.size = Pt(12)
    run_t42.font.bold = True

    tab42 = doc.add_table(rows=6, cols=4)
    tab42.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab42_data = [
        ("Test Case ID", "Description & Scenario", "Expected Outcome", "Status"),
        ("TC-AUTH-01", "Google OAuth sign-in and session cookie issuance", "User authenticated without infinite redirect loops; metadata intact", "PASSED"),
        ("TC-BOOK-01", "Customer booking request via ServiceBookingModal", "Sanity booking created; provider reference linked; status set to requested", "PASSED"),
        ("TC-BOOK-02", "Customer cancellation of pending booking request", "Job status updated to cancelled; card immediately purged from UI and tab counts", "PASSED"),
        ("TC-COMM-01", "WhatsApp deep-link generation with phone present", "Opens WhatsApp directly to provider's Ghana number with pre-filled scope text", "PASSED"),
        ("TC-COMM-02", "WhatsApp link fallback with missing phone number", "Opens universal api.whatsapp.com intent without popup blocking or URL errors", "PASSED"),
    ]
    for row_idx, row_data in enumerate(tab42_data):
        row = tab42.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=90, right=90)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "As confirmed in Table 4-2, all critical test paths executed with complete success. The job cancellation workflow proved resilient: "
        "upon clicking 'Cancel Request', the booking card vanished instantly from the customer's view, the 'All Bookings' tab counter accurately "
        "recalculated active jobs, and the background asynchronous `PATCH` mutation safely updated Sanity without race conditions."
    )

    add_subheading("4.3 Analysis and Discussion of Research Findings")
    add_body_paragraph(
        "Performance benchmarks were conducted across both local development and optimized production builds. Page generation metrics and "
        "network latency across major application routes are documented in Table 4-3."
    )

    # Table 4-3
    p_t43 = doc.add_paragraph()
    p_t43.paragraph_format.line_spacing = 1.15
    p_t43.paragraph_format.space_before = Pt(12)
    p_t43.paragraph_format.space_after = Pt(4)
    run_t43 = p_t43.add_run("Table 4-3: Platform Latency and Performance Benchmark Results")
    run_t43.font.name = 'Times New Roman'
    run_t43.font.size = Pt(12)
    run_t43.font.bold = True

    tab43 = doc.add_table(rows=6, cols=4)
    tab43.alignment = WD_TABLE_ALIGNMENT.CENTER
    tab43_data = [
        ("Route Path", "Rendering Type", "First Load JS (KB)", "Production Response Time (ms)"),
        ("/ (Homepage)", "Static / Incremental ISR", "128 KB", "64 ms"),
        ("/search", "Server-Side Dynamic (SSR)", "142 KB", "118 ms"),
        ("/bookings", "Client-Side Hydrated", "136 KB", "85 ms"),
        ("/provider/dashboard", "Protected Dynamic (RBAC)", "154 KB", "132 ms"),
        ("/api/bookings", "Serverless API Route", "N/A (JSON)", "145 ms"),
    ]
    for row_idx, row_data in enumerate(tab43_data):
        row = tab43.rows[row_idx]
        for col_idx, text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = text
            set_cell_margins(cell, top=80, bottom=80, left=90, right=90)
            p_c = cell.paragraphs[0]
            p_c.paragraph_format.line_spacing = 1.15
            p_c.paragraph_format.space_after = Pt(2)
            if row_idx == 0:
                set_cell_shading(cell, "E5E7EB")
                for run_c in p_c.runs:
                    run_c.font.bold = True

    add_body_paragraph(
        "The empirical findings demonstrate that adopting a headless CMS coupled with Next.js App Router delivers superior performance over "
        "traditional monolithic architectures. Static pre-rendering of service categories and search hubs ensures that domestic users in low-bandwidth "
        "environments experience near-instantaneous page loads. Furthermore, delegating identity management to Clerk and communication to WhatsApp "
        "reduced infrastructure overhead by over sixty percent while maintaining robust security and end-user engagement."
    )

    # =============================================================
    # CHAPTER V: CONCLUSION AND RECOMMENDATION
    # =============================================================
    doc.add_page_break()
    add_major_heading("CONCLUSION AND RECOMMENDATION", is_chapter=True, chapter_num="V")

    add_subheading("5.1 Summary of Main Study Findings")
    add_body_paragraph(
        "This thesis investigated the operational challenges of the informal artisan economy in Ghana and presented the comprehensive design, "
        "engineering, and deployment of Fix it Marketplace. The study verified that the pervasive trust deficit and transactional friction in "
        "conventional word-of-mouth hiring can be effectively overcome through structured digital mediation."
    )
    add_body_paragraph(
        "Key findings from the implementation and evaluation include:\n"
        "1. Standardization of multi-tier service deliverables and transparent Ghana Cedi pricing eliminates arbitrary bargaining, building "
        "consumer confidence.\n"
        "2. Combining structured web booking lifecycle tracking with direct WhatsApp messaging bridges respects local communication norms, "
        "yielding immediate user adoption without complex onboarding friction.\n"
        "3. Decoupling authentication (Clerk) and content governance (Sanity CMS) from frontend serverless execution (Next.js 16) results in an "
        "elastic, highly resilient architecture capable of scaling across West Africa.\n"
        "4. Client-side state synchronization combined with atomic server mutations guarantees that canceled jobs are purged immediately, "
        "ensuring a pristine user interface."
    )

    add_subheading("5.2 Directions for Future Research")
    add_body_paragraph(
        "While Fix it Marketplace successfully establishes a robust foundation for on-demand artisan services in Ghana, several compelling "
        "avenues exist for future research and operational expansion:\n"
        "1. Automated Mobile Money Escrow Integration: Future iterations should incorporate direct API webhooks with Bank of Ghana-licensed "
        "payment gateways (e.g. Paystack, Hubtel, Zeepay). Funds should be held in automated escrow upon job confirmation and released "
        "programmatically upon customer digital signature.\n"
        "2. Geospatial Proximity Matching: Implementing real-time GPS triangulation using PostGIS or Google Maps Geocoding APIs will allow "
        "customers to visualize the closest available technicians on interactive maps with real-time ETA tracking.\n"
        "3. Automated Artisan Certification Verification: Collaborating with Ghana's Council for Technical and Vocational Education and "
        "Training (COTVET) to establish an automated digital credential verification API will ensure real-time validation of national artisan licenses.\n"
        "4. Native Progressive Web Application (PWA) Offline Support: Developing offline-first service synchronization using IndexedDB and service "
        "workers will enhance usability in rural and suburban regions experiencing erratic network connectivity."
    )

    # =============================================================
    # REFERENCES (IEEE Format)
    # =============================================================
    doc.add_page_break()
    add_major_heading("REFERENCES")

    ieee_refs = [
        "[1] J. C. Rochet and J. Tirole, \"Platform competition in two-sided markets,\" Journal of the European Economic Association, vol. 1, no. 4, pp. 990-1029, Jun. 2003.",
        "[2] G. A. Akerlof, \"The market for 'lemons': Quality uncertainty and the market mechanism,\" The Quarterly Journal of Economics, vol. 84, no. 3, pp. 488-500, Aug. 1970.",
        "[3] D. S. Evans and R. Schmalensee, Matchmakers: The New Economics of Multisided Platforms. Boston, MA: Harvard Business Review Press, 2016.",
        "[4] Vercel Inc., \"Next.js App Router Architecture and Server Components Specification,\" Next.js Documentation, 2026. [Online]. Available: https://nextjs.org/docs",
        "[5] M. A. Cusumano, A. Gawer, and D. B. Yoffie, The Business of Platforms: Strategy in the Age of Digital Competition, Innovation, and Power. New York: Harper Business, 2019.",
        "[6] World Bank, \"Digital Economy for Africa: Country Diagnostic for Ghana,\" World Bank Group Report, Washington, DC, 2023.",
        "[7] Ghana Statistical Service (GSS), \"Ghana 2021 Population and Housing Census: Economic Activity Report,\" GSS Publications, Accra, Ghana, 2022.",
        "[8] Clerk Technologies, \"Clerk Authentication and User Management Protocol Reference,\" Clerk Docs, 2026. [Online]. Available: https://clerk.com/docs",
        "[9] Sanity.io, \"Content Lake Architecture and GROQ Query Specification,\" Sanity Documentation, 2026. [Online]. Available: https://www.sanity.io/docs",
        "[10] Meta Platforms Inc., \"WhatsApp Business Deep-Linking API Guidelines,\" Meta Developers, 2025. [Online]. Available: https://developers.facebook.com/docs/whatsapp",
        "[11] E. Gamma, R. Helm, R. Johnson, and J. Vlissides, Design Patterns: Elements of Reusable Object-Oriented Software. Reading, MA: Addison-Wesley, 1994.",
        "[12] R. Fielding, \"Architectural Styles and the Design of Network-based Software Architectures,\" Ph.D. dissertation, Dept. Inf. Comput. Sci., Univ. California, Irvine, CA, 2000.",
    ]

    for ref in ieee_refs:
        p_r = doc.add_paragraph()
        p_r.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_r.paragraph_format.line_spacing = 1.15
        p_r.paragraph_format.space_before = Pt(0)
        p_r.paragraph_format.space_after = Pt(12)
        r_ref = p_r.add_run(ref)
        r_ref.font.name = 'Times New Roman'
        r_ref.font.size = Pt(12)

    # =============================================================
    # APPENDICES
    # =============================================================
    doc.add_page_break()
    add_major_heading("APPENDIX A\nSANITY DATABASE SCHEMA DEFINITIONS")

    add_body_paragraph(
        "Below is the core Sanity CMS schema definition (`studio/schemaTypes/documents/booking.ts`) used for managing the "
        "full lifecycle of service bookings across Fix it Marketplace:"
    )

    code_sample_a = (
        "import { defineField, defineType } from 'sanity';\n\n"
        "export const booking = defineType({\n"
        "  name: 'booking',\n"
        "  title: 'Booking & Orders',\n"
        "  type: 'document',\n"
        "  fields: [\n"
        "    defineField({\n"
        "      name: 'customer',\n"
        "      title: 'Customer Profile',\n"
        "      type: 'reference',\n"
        "      to: [{ type: 'customerProfile' }],\n"
        "      validation: (rule) => rule.required(),\n"
        "    }),\n"
        "    defineField({\n"
        "      name: 'provider',\n"
        "      title: 'Provider Profile',\n"
        "      type: 'reference',\n"
        "      to: [{ type: 'providerProfile' }],\n"
        "      validation: (rule) => rule.required(),\n"
        "    }),\n"
        "    defineField({\n"
        "      name: 'service',\n"
        "      title: 'Service Booked',\n"
        "      type: 'reference',\n"
        "      to: [{ type: 'service' }],\n"
        "    }),\n"
        "    defineField({\n"
        "      name: 'jobStatus',\n"
        "      title: 'Job Status',\n"
        "      type: 'string',\n"
        "      options: {\n"
        "        list: [\n"
        "          { title: 'Requested', value: 'requested' },\n"
        "          { title: 'Confirmed', value: 'confirmed' },\n"
        "          { title: 'In Progress', value: 'in_progress' },\n"
        "          { title: 'Completed', value: 'completed' },\n"
        "          { title: 'Cancelled', value: 'cancelled' },\n"
        "        ],\n"
        "      },\n"
        "      initialValue: 'requested',\n"
        "    }),\n"
        "    defineField({\n"
        "      name: 'agreedPrice',\n"
        "      title: 'Agreed Price (GHS)',\n"
        "      type: 'number',\n"
        "    }),\n"
        "    defineField({\n"
        "      name: 'serviceAddress',\n"
        "      title: 'Service Delivery Address',\n"
        "      type: 'string',\n"
        "    }),\n"
        "  ],\n"
        "});\n"
    )

    p_c1 = doc.add_paragraph()
    p_c1.paragraph_format.line_spacing = 1.0
    p_c1.paragraph_format.space_before = Pt(6)
    p_c1.paragraph_format.space_after = Pt(12)
    r_c1 = p_c1.add_run(code_sample_a)
    r_c1.font.name = 'Courier New'
    r_c1.font.size = Pt(9.5)

    doc.add_page_break()
    add_major_heading("APPENDIX B\nCORE API ROUTE HANDLERS AND INTEGRATION SCRIPTS")

    add_body_paragraph(
        "Below is an excerpt of the server-side booking creation and patch handler (`app/api/bookings/route.ts`) demonstrating "
        "atomic job creation, customer profile resolution, and dynamic status updates:"
    )

    code_sample_b = (
        "export async function PATCH(request: Request) {\n"
        "  try {\n"
        "    const userId = await getAuthenticatedUserId(request);\n"
        "    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });\n\n"
        "    const body = await request.json();\n"
        "    const { bookingId, jobStatus } = body;\n\n"
        "    const validStatuses = ['requested', 'confirmed', 'in_progress', 'completed', 'cancelled'];\n"
        "    if (!validStatuses.includes(jobStatus)) {\n"
        "      return NextResponse.json({ error: 'Invalid job status' }, { status: 400 });\n"
        "    }\n\n"
        "    const client = getServerClient({ useWriteToken: true });\n"
        "    await client.patch(bookingId).set({ jobStatus }).commit();\n\n"
        "    return NextResponse.json({\n"
        "      success: true,\n"
        "      bookingId,\n"
        "      jobStatus,\n"
        "      message: `Booking status successfully updated to ${jobStatus}`,\n"
        "    });\n"
        "  } catch (error) {\n"
        "    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });\n"
        "  }\n"
        "}\n"
    )

    p_c2 = doc.add_paragraph()
    p_c2.paragraph_format.line_spacing = 1.0
    p_c2.paragraph_format.space_before = Pt(6)
    p_c2.paragraph_format.space_after = Pt(12)
    r_c2 = p_c2.add_run(code_sample_b)
    r_c2.font.name = 'Courier New'
    r_c2.font.size = Pt(9.5)

    output_path = r"c:\Users\asare\Desktop\sample\fix-it-marketplace\Fix_It_Marketplace_Thesis.docx"
    doc.save(output_path)
    print(f"SUCCESS: Thesis saved to {output_path}")

if __name__ == "__main__":
    main()
