// Inisialisasi ikon Lucide & Render Awal
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderProjects("all");
    renderCertificates("all");
});

// Toggle Menu Mobile
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// ==========================================
// 1. LOGIKA TERMINAL INTERAKTIF
// ==========================================
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

const terminalResponses = {
    "help": "Perintah tersedia: <span class='text-emerald-400'>whoami</span>, <span class='text-cyan-400'>education</span>, <span class='text-purple-400'>experiece</span>, <span class='text-rose-400'>skills</span>, <span class='text-amber-400'>certs</span>, <span class='text-slate-200'>clear</span>",
    "whoami": "Spesialisasi CyberSecurity, Data Science & AI. Memiliki pengalaman eksploratif dalam pengujian keamanan dan jaringan, serta terbiasa menjelaskan solusi teknis. Terbuka untuk peran IT dengan semangat belajar tinggi, kemampuan komunikasi yang baik, dan pendekatan analitis dalam menyelesaikan masalah teknis.",
    "education": "[KULIAH] Universitas Islam Syekh-Yusuf\n[Program] Teknik Informatika\n[IPK] 3.70/4.00",
    "experiece": "[TEMPAT] Balai Pemasyarakatan Kelas 1 Tangerang\n[POSITION] IT SUPPORT\n[TAHUN] Oktober 2025 - Januari 2026",
    "certs": "Sertifikasi & Pelatihan: Data Analysis With Python (freeCodeCamp), Industrial CyberSecurity (CISCO), Certified Cybersecurity Educator Professional (CCEP), dan lainnya.",
    "skills": "Python, Machine Learning & Data Analyst, Penetration Testing System, VLAN & Port Mirroring, Bash Scripting, Problem Solving"
};

function runTerminalCmd(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (cleanCmd === "clear") {
        terminalOutput.innerHTML = `<div class="text-slate-500"># Terminal dibersihkan. Ketik 'help' untuk daftar perintah.</div>`;
        return;
    }

    const userLine = document.createElement("div");
    userLine.innerHTML = `<span class="text-emerald-400">kali@sec-lab:~$</span> ${cmd}`;
    terminalOutput.appendChild(userLine);

    const responseLine = document.createElement("div");
    responseLine.className = "text-slate-300 pl-2 border-l-2 border-slate-700 whitespace-pre-line";
    responseLine.innerHTML = terminalResponses[cleanCmd] || `Perintah tidak dikenali: '${cmd}'. Ketik <span class="text-emerald-400">help</span> untuk bantuan.`;
    terminalOutput.appendChild(responseLine);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && terminalInput.value.trim() !== "") {
            runTerminalCmd(terminalInput.value);
            terminalInput.value = "";
        }
    });
}

// ==========================================
// 2. DATA & LOGIKA PROYEK UNGGULAN (10 SLOT)
// ==========================================
const INITIAL_VISIBLE_COUNT = 6; // Menampilkan 6 kartu awal agar rapi
let currentProjectFilter = "all";
let showAllProjects = false;

const projectsData = [
    {
        id: 1,
        category: "security",
        badge: "Network Security & ML",
        title: "Deteksi Anomali Trafik Terenkripsi Berbasis JA4 & Isolation Forest",
        summary: "Sistem forensik deteksi anomali jaringan terenkripsi menggunakan ekstraksi metadata Zeek IDS, JA4 TLS Fingerprinting, dan algoritma Isolation Forest.",
        tech: ["Python", "Zeek IDS", "JA4", "Isolation Forest", "Streamlit"],
        details: `
            <p><strong>Latar Belakang:</strong> Mayoritas trafik jaringan modern telah terenkripsi dengan TLS, sehingga pada malware kontemporer menggunakan traffic terenkripsi agar menghindari sistem pertahanan modern, inspeksi paket mendalam (DPI) konvensional kehilangan visibilitas tanpa mendekripsi trafik.</p>
            <p><strong>Solusi & Arsitektur:</strong> Mengembangkan sistem modular (<code>Pcap_Processor.py</code>, <code>Analyzer_Offline.py</code>, dan <code>Dashboard_Forensik.py</code>) yang menangkap trafik melalui Switch Port Mirroring, mengekstrak log <code>conn.log</code> dan <code>ssl.log</code> menggunakan Zeek, serta memodelkan fitur JA4 Fingerprint bersama durasi dan volume byte ke dalam algoritma <em>Isolation Forest</em>.</p>
            <p><strong>Hasil:</strong> Mampu mengidentifikasi anomali koneksi terenkripsi secara optimal dan menyajikannya pada dashboard visual forensik jaringan.</p>
        `,
        github: "https://github.com/ArenaldyP/Encrypted-Network-Traffic-Anomaly-Detection"
    },
    {
        id: 2,
        category: "datascience",
        badge: "Data Analyst & Network Security",
        title: "Klasifikasi Tipe Serangan Siber",
        summary: "Pengelohan data dengan klasifikasi tipe serangan siber (DDOS, Malware, Intrusion) menggunakan dataset log jaringan.",
        tech: ["Python", "Scikit-Learn", "pandas", "NLP", "Feature Engineering", "RandomForest"],
        details: `
            <p><strong>Latar Belakang:</strong>Dengan banyaknya tipe serangan siber, dalam menangani serangan juga berbeda-beda berdasarkan tipe serangannya </p>
            <p><strong>Solusi & Arsitektur:</strong> Melakukan beberapa proses data preprocessing agar data layak digunakan dalam algoritma randoforest</p>
            <p><strong>Hasil:</strong> Pipeline yang bersih, terukur, dan terdokumentasi untuk memprediksi tipe serangan siber secara optimal.</p>
        `,
        github: "https://github.com/ArenaldyP/Klasifikasi-Tipe-Serangan-Siber"
    },
    {
        id: 3,
        category: "security",
        badge: "Threat Intelligence",
        title: "Simulasi Serangan APT",
        summary: "Simulasi teknik APT (Advancede Persistent Threat)  yang menargetkan berbagai sektor vital, baik swasta maupun pemerintahan.",
        tech: ["Python", "C++", "C", "Kali Linux", "Windows", "Php", "Ruby", "Hacking"],
        details: `
            <p><strong>Latar Belakang:</strong> Serangan APT adalah actor yang paling berbahaya karena memiliki kemampuan, sumber daya dan waktu yang melimpah sehingga sangat penting untuk memahami proses dan cara kerja group tersebut.</p>
            <p><strong>Solusi & Arsitektur:</strong> Simulasi ini mencakup alat yang ditulis, server C2, backdoor, teknik eksploitasi, stager, bootloader, dan berbagai alat lainnya yang mungkin digunakan penyerang dalam serangan nyata. Alat dan TTPs ini disimulasikan di sini. Saya mengandalkan informasi dari Palo Alto Networks Unit 42, Kaspersky, Microsoft, Cisco, Trellix, CrowdStrike, dan WithSecure untuk mendapatkan detail yang diperlukan dalam membuat simulasi ini.</p>
            <p><strong>Hasil:</strong>Dengan memahami proses APT, kita dapat informasi berharga mengenai TTP (Tactics, Technique, Procedure) yang digunakan untuk meningkatkan sistem pertahanan dalam organisasi </p>
        `,
        github: "https://github.com/"
    },
    {
        id: 4,
        category: "security",
        badge: "Malware Analisis",
        title: "Statis Malware Analisis",
        summary: "Kumpulan Script digunakan untuk melakukan Statik Analisis Malware yang berguna untuk tahapan awal dalam malware analisis dengan mencari informasi-informasi penting dalam malware.",
        tech: ["Python", "Malware Analyst", "Hacking", "Reverse Engineering"],
        details: `
            <p><strong>Latar Belakang:</strong> Dalam tahapan awal malware analisis yakni tahapan analisis statis malware untuk menentukan jenis file, packer, enkripsi, dan lainnya yang biasa digunakan pengembang malware.</p>
            <p><strong>Solusi & Arsitektur:</strong> Analisis statis merupakan langkah pertama dalam analisis malware analisis ini memungkinkan kita untuk mengekstrak informasi berharga dari biner dan membantu dalam membandingkan dan mengklasifikasikan sampel malware. Proyek ini memperkenalkan kita pada berbagai alat dan teknik, yang dengannya berbagai aspek biner malware dapat ditentukan tanpa menjalankannya.</p>
            <p><strong>Hasil:</strong> Dari kumpulan skrip ini kita belajar mengenai informasi malware tanpa menjalankannya.</p>
        `,
        github: "https://github.com/ArenaldyP/Statik-Analisis-Malware"
    },
    {
        id: 5,
        category: "security",
        badge: "Malware Development",
        title: "Malware Development Teknik",
        summary: "Kumpulan proses dan teknik dalam mengembangkan malware mulai dari teknik penghindaran, enkripsi dan lainnya. ",
        tech: ["Python", "C", "Hacking", "System Development", "Defense Envasion"],
        details: `
            <p><strong>Latar Belakang:</strong> Malware adalah software berbahaya yang melakukan hal yang dekstruktif kepada sistem, dengan mengetahui proses dan teknik pengembangannya kita tahu apa yang dilakukan malware dalam sistem dan cara penanganannya.</p>
            <p><strong>Solusi & Arsitektur:</strong> Proyek ini adalah proyek dibuat untuk tujuan edukasi dan penelitian keamanan siber, dilarang digunakan untuk aktivitas illegal.</p>
            <p><strong>Hasil:</strong> Mengetahui dan paham teknik dan proses pengembangan malware untuk penelitian.</p>
        `,
        github: "https://github.com/ArenaldyP/Malware-Development"
    }
    
];

function renderProjects(filter) {
    currentProjectFilter = filter;
    const grid = document.getElementById("projects-grid");
    const countBadge = document.getElementById("projects-count");
    const toggleContainer = document.getElementById("projects-toggle-container");
    const toggleText = document.getElementById("projects-toggle-text");
    const toggleIcon = document.getElementById("projects-toggle-icon");

    const filtered = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);
    countBadge.textContent = `${filtered.length} Proyek`;

    const visibleItems = showAllProjects ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT);

    grid.innerHTML = visibleItems.map(proj => `
        <div class="card-hover rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between space-y-5 animate-fade-in">
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ${proj.badge}
                    </span>
                    <a href="${proj.github}" target="_blank" class="text-slate-400 hover:text-white transition" title="Lihat Source Code">
                        <i data-lucide="github" class="w-4 h-4"></i>
                    </a>
                </div>
                <h3 class="text-lg font-bold text-white leading-snug">${proj.title}</h3>
                <p class="text-sm text-slate-400 leading-relaxed">${proj.summary}</p>
            </div>

            <div class="space-y-4 pt-2">
                <div class="flex flex-wrap gap-1.5">
                    ${proj.tech.map(t => `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">${t}</span>`).join("")}
                </div>
                <button onclick="openProjectModal(${proj.id})" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-semibold transition flex items-center justify-center gap-1.5">
                    <span>Baca Studi Kasus</span>
                    <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join("");

    // Atur tombol Tampilkan Semua / Sembunyikan
    if (filtered.length > INITIAL_VISIBLE_COUNT) {
        toggleContainer.classList.remove("hidden");
        toggleText.textContent = showAllProjects ? "Tampilkan Lebih Sedikit" : `Tampilkan Semua Proyek (${filtered.length})`;
        toggleIcon.setAttribute("data-lucide", showAllProjects ? "chevron-up" : "chevron-down");
    } else {
        toggleContainer.classList.add("hidden");
    }

    lucide.createIcons();
}

function filterProjects(category) {
    showAllProjects = false; // Reset ke tampilan ringkas saat ganti tab filter
    document.querySelectorAll(".proj-filter").forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.className = "proj-filter px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500 text-slate-950 font-semibold transition";
        } else {
            btn.className = "proj-filter px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
        }
    });
    renderProjects(category);
}

function toggleShowAllProjects() {
    showAllProjects = !showAllProjects;
    renderProjects(currentProjectFilter);
}

// ==========================================
// 3. DATA & LOGIKA SERTIFIKAT (10 SLOT)
// ==========================================
let currentCertFilter = "all";
let showAllCertificates = false;

const certificatesData = [
    {
        id: 101,
        category: "data",
        title: "Data Analysis With Python",
        issuer: "freeCodeCamp",
        date: "2025",
        credentialId: "FCC-DAP-2025",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/f6f330ef6c0a625b9f2dc38d5dea9d46e08e5587/Sertifikat/Cert%20Data.png",
        skills: ["Python", "pandas", "NumPy", "Data Analysis"]
    },
    {
        id: 102,
        category: "security",
        title: "Industrial Cybersecurity",
        issuer: "CISCO Networking Academy",
        date: "2026",
        credentialId: "CISCO-ICS-2026",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Industrial.png",
        skills: ["Risk Assessment", "CyberAttack Analysis", "OT Security", "Zero Trust"]
    },
    {
        id: 103,
        category: "security",
        title: "Certified Cybersecurity Educator Professional (CCEP)",
        issuer: "Red Team Leaders",
        date: "2025",
        credentialId: "RTL-CCEP-2025",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/CCEP.png",
        skills: ["Cybersecurity", "Security Awareness", "Red Teaming Concepts"]
    },
    {
        id: 104,
        category: "security",
        title: "API Penetration Testing",
        issuer: "APIsec University",
        date: "2024",
        credentialId: "AU-APT-2024",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20API.png",
        skills: ["API Penetration Testing", "API Security", "Application Security", "Application Security Testing", "Bug Bounty Hunting", "Hacking"]
    },
    {
        id: 105,
        category: "security",
        title: "Ethical Hacking",
        issuer: "Udemy",
        date: "2024",
        credentialId: "UD-EH-2024",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Hacking%20Udemy.png",
        skills: ["Hacking", "Penetration Testing"]
    },
    {
        id: 106,
        category: "security",
        title: "Cisco Ethical Hacker",
        issuer: "CISCO",
        date: "2023",
        credentialId: "CISCO-CEH-2023",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Ethical%20Hacker.png",
        skills: ["Ethical Hacker", "Exploiting Applications", "Exploiting Networks", "IoT Security", "Penetraion Testing", "Pentesting Tools", "Reporting", "Social Engineering", "Vulnerability Assesment", "Vulnerability Scanning"]
    },
    {
        id: 107,
        category: "security",
        title: "Junior Cybersecurity Analyst",
        issuer: "CISCO",
        date: "2023",
        credentialId: "CISCO-JCA-2023",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Cybersecurity%20Analyst.png",
        skills: ["System and Network Defense", "Linux", "Windows Security", "Application Security", "Cloud Security", "Network Infrastructure Security"]
    },
    {
        id: 108,
        category: "security",
        title: "Cyber Threat Management",
        issuer: "CISCO",
        date: "2023",
        credentialId: "CISCO-CTM-2023",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Cyber%20Threat%20Management.png",
        skills: ["Disaster Recovery", "Incident Response", "Risk Assessments", "Threat Intelligence Services", "CVSS"]
    },
    {
        id: 109,
        category: "security",
        title: "Network Defense",
        issuer: "CISCO",
        date: "2023",
        credentialId: "CISCO-ND-2023",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Network%20Defense.png",
        skills: ["Network Hardening", "Defense-in-Depth", "System and Network Defense", "Access Controls"]
    },
    {
        id: 110,
        category: "data",
        title: "Python Pro Bootcamp 2022",
        issuer: "Udemy",
        date: "2022",
        credentialId: "UD-PPB-2022",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20Python%20Pro%20Bootcamp%202022.png",
        skills: ["Python"]
    },
    {
        id: 111,
        category: "security",
        title: "ISO/IEC 27001:2022",
        issuer: "Udemy",
        date: "2023",
        credentialId: "UD-ISO-2023",
        image: "https://raw.githubusercontent.com/R3nalDy/Sertifikat/refs/heads/main/Sertifikat/Cert%20ISO.png",
        skills: ["ISO/IEC 27001:2022"]
    }
];

function renderCertificates(filter) {
    currentCertFilter = filter;
    const grid = document.getElementById("certificates-grid");
    const countBadge = document.getElementById("certificates-count");
    const toggleContainer = document.getElementById("certificates-toggle-container");
    const toggleText = document.getElementById("certificates-toggle-text");
    const toggleIcon = document.getElementById("certificates-toggle-icon");

    const filtered = filter === "all" ? certificatesData : certificatesData.filter(c => c.category === filter);
    countBadge.textContent = `${filtered.length} Sertifikat`;

    const visibleItems = showAllCertificates ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT);

    grid.innerHTML = visibleItems.map(cert => `
        <div class="card-hover rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between animate-fade-in">
            <div>
                <!-- Thumbnail Gambar Sertifikat -->
                <div class="relative h-44 bg-slate-800 overflow-hidden group cursor-pointer" onclick="openCertModal(${cert.id})">
                    <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85 group-hover:opacity-100">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-[11px] font-mono text-emerald-400">
                        ${cert.date}
                    </span>
                </div>

                <!-- Info Sertifikat -->
                <div class="p-5 space-y-2">
                    <div class="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                        <i data-lucide="award" class="w-3.5 h-3.5"></i>
                        <span>${cert.issuer}</span>
                    </div>
                    <h3 class="text-base font-bold text-white leading-snug">${cert.title}</h3>
                    <p class="text-xs font-mono text-slate-500">ID: ${cert.credentialId}</p>
                </div>
            </div>

            <div class="px-5 pb-5 space-y-3">
                <div class="flex flex-wrap gap-1.5">
                    ${cert.skills.map(s => `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">${s}</span>`).join("")}
                </div>
                <button onclick="openCertModal(${cert.id})" class="w-full py-2 rounded-xl bg-slate-800/90 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-semibold transition flex items-center justify-center gap-1.5">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                    <span>Lihat Sertifikat</span>
                </button>
            </div>
        </div>
    `).join("");

    // Atur tombol Tampilkan Semua / Sembunyikan
    if (filtered.length > INITIAL_VISIBLE_COUNT) {
        toggleContainer.classList.remove("hidden");
        toggleText.textContent = showAllCertificates ? "Tampilkan Lebih Sedikit" : `Tampilkan Semua Sertifikat (${filtered.length})`;
        toggleIcon.setAttribute("data-lucide", showAllCertificates ? "chevron-up" : "chevron-down");
    } else {
        toggleContainer.classList.add("hidden");
    }

    lucide.createIcons();
}

function filterCertificates(category) {
    showAllCertificates = false; // Reset ke tampilan ringkas saat ganti tab filter
    document.querySelectorAll(".cert-filter").forEach(btn => {
        if (btn.dataset.cert === category) {
            btn.className = "cert-filter px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500 text-slate-950 font-semibold transition";
        } else {
            btn.className = "cert-filter px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
        }
    });
    renderCertificates(category);
}

function toggleShowAllCertificates() {
    showAllCertificates = !showAllCertificates;
    renderCertificates(currentCertFilter);
}

// ==========================================
// 4. MODAL POP-UP (PROYEK & SERTIFIKAT)
// ==========================================
const modal = document.getElementById("universal-modal");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openProjectModal(id) {
    const proj = projectsData.find(p => p.id === id);
    if (!proj) return;

    modalCategory.textContent = proj.badge;
    modalTitle.textContent = proj.title;
    modalBody.innerHTML = `
        <div class="space-y-3">${proj.details}</div>
        <div class="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
            ${proj.tech.map(t => `<span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-emerald-400">${t}</span>`).join("")}
        </div>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function openCertModal(id) {
    const cert = certificatesData.find(c => c.id === id);
    if (!cert) return;

    modalCategory.textContent = `${cert.issuer} • ${cert.date}`;
    modalTitle.textContent = cert.title;
    modalBody.innerHTML = `
        <div class="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <img src="${cert.image}" alt="${cert.title}" class="w-full max-h-96 object-contain mx-auto">
        </div>
        <div class="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
            <span>Credential ID: ${cert.credentialId}</span>
            <span class="text-emerald-400">Verified Credential</span>
        </div>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});