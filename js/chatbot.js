/**
 * ==========================================================================
 * V Care AI Assistant - Interactive Chatbot Engine
 * ==========================================================================
 */

(function () {
  'use strict';

  let isChatOpen = false;
  let hasInteracted = false;
  const kb = window.VCareKnowledge || {};

  // Inject Chatbot HTML Structure into Page Body
  function initChatbotDOM() {
    const chatbotHTML = `
      <!-- Chatbot Launcher Trigger Button -->
      <div class="chatbot-launcher" id="chatbotLauncher">
        <div class="chatbot-tooltip">
          <i class="fas fa-robot"></i> Ask VCare AI
        </div>
        <div class="chatbot-trigger-btn" id="chatbotToggleBtn" aria-label="Open Chat Assistant">
          <div class="chatbot-pulse-ring"></div>
          <i class="fas fa-comments" id="chatIconOpen"></i>
          <i class="fas fa-times" id="chatIconClose" style="display:none;"></i>
        </div>
      </div>

      <!-- Main Floating Chat Modal Window -->
      <div class="chatbot-container" id="chatbotContainer" inert aria-hidden="true" role="dialog" aria-label="VCare Chat Assistant Window">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <i class="fas fa-user-shield"></i>
              <span class="chat-status-dot"></span>
            </div>
            <div class="chat-title-box">
              <h4>VCare AI Assistant</h4>
              <p>Online • IT Products & Project Support</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <button class="chat-header-btn" id="chatRefreshBtn" title="Reset Chat">
              <i class="fas fa-sync-alt"></i>
            </button>
            <button class="chat-header-btn" id="chatCloseBtn" title="Minimize Chat">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <!-- Chat History Area -->
        <div class="chatbot-body" id="chatHistory">
          <!-- Messages dynamically inserted here -->
        </div>

        <!-- Input Bar -->
        <div class="chatbot-footer">
          <input type="text" class="chat-input" id="chatInput" placeholder="Type your question here (e.g. Products, Projects, AMC)..." />
          <button class="chat-send-btn" id="chatSendBtn" aria-label="Send Message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Event Listeners
    document.getElementById('chatbotToggleBtn').addEventListener('click', toggleChat);
    document.getElementById('chatbotLauncher').querySelector('.chatbot-tooltip').addEventListener('click', toggleChat);
    document.getElementById('chatCloseBtn').addEventListener('click', toggleChat);
    document.getElementById('chatRefreshBtn').addEventListener('click', resetChatHistory);

    const sendBtn = document.getElementById('chatSendBtn');
    const inputField = document.getElementById('chatInput');

    sendBtn.addEventListener('click', () => handleUserSend());
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserSend();
      }
    });

    // Hero quick chat prompt trigger link if present on page
    document.querySelectorAll('.js-open-chat').forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isChatOpen) toggleChat();
        const prompt = elem.getAttribute('data-prompt');
        if (prompt) {
          inputField.value = prompt;
          handleUserSend();
        }
      });
    });
  }

  function toggleChat() {
    isChatOpen = !isChatOpen;
    const container = document.getElementById('chatbotContainer');
    const openIcon = document.getElementById('chatIconOpen');
    const closeIcon = document.getElementById('chatIconClose');

    container.inert = !isChatOpen;
    container.setAttribute('aria-hidden', String(!isChatOpen));
    document.getElementById('chatbotToggleBtn').setAttribute('aria-expanded', String(isChatOpen));

    if (isChatOpen) {
      container.classList.add('active');
      openIcon.style.display = 'none';
      closeIcon.style.display = 'block';

      if (!hasInteracted) {
        sendBotGreeting();
        hasInteracted = true;
      }
      setTimeout(() => document.getElementById('chatInput').focus(), 300);
    } else {
      container.classList.remove('active');
      document.getElementById('chatbotToggleBtn').focus();
      openIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendUserMessage(text) {
    const history = document.getElementById('chatHistory');
    const msgHTML = `
      <div class="chat-msg user">
        <div class="msg-bubble">${escapeHTML(text)}</div>
      </div>
    `;
    history.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
  }

  function appendBotMessage(htmlContent, quickChips = []) {
    const history = document.getElementById('chatHistory');
    
    // Remove existing typing indicator if present
    removeTypingIndicator();

    let chipsHTML = '';
    if (quickChips && quickChips.length > 0) {
      chipsHTML = `<div class="quick-replies">` + 
        quickChips.map(c => `<button class="chip-btn" onclick="window.VCareChat.handleChipClick('${escapeHTML(c)}')">${escapeHTML(c)}</button>`).join('') +
        `</div>`;
    }

    const msgHTML = `
      <div class="chat-msg bot">
        <div class="msg-bubble">
          ${htmlContent}
          ${chipsHTML}
          <div class="msg-time">${getTimeString()}</div>
        </div>
      </div>
    `;

    history.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const history = document.getElementById('chatHistory');
    const typingHTML = `
      <div class="chat-msg bot" id="typingIndicator">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    history.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const elem = document.getElementById('typingIndicator');
    if (elem) elem.remove();
  }

  function scrollToBottom() {
    const history = document.getElementById('chatHistory');
    history.scrollTop = history.scrollHeight;
  }

  function escapeHTML(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function sendBotGreeting() {
    const comp = (window.VCareKnowledge && window.VCareKnowledge.company) || {};
    const greetingText = `Hello! 👋 Welcome to <strong>${comp.name || 'V Care Communication'}</strong>.<br><br>I am your AI Assistant. How can I help you today? Select an option below or type your query:`;
    const defaultChips = [
      "👤 Who is the Owner / Founder?",
      "📦 What Products Do You Sell?",
      "🚀 Customer Projects We Did",
      "⚙️ IT AMC & Services",
      "📞 Contact & Office Address"
    ];
    appendBotMessage(greetingText, defaultChips);
  }

  function resetChatHistory() {
    const history = document.getElementById('chatHistory');
    history.innerHTML = '';
    hasInteracted = false;
    sendBotGreeting();
  }

  function handleUserSend() {
    const inputField = document.getElementById('chatInput');
    const query = inputField.value.trim();
    if (!query) return;

    appendUserMessage(query);
    inputField.value = '';

    showTypingIndicator();
    setTimeout(() => {
      processUserQuery(query);
    }, 450);
  }

  // Handle clicking quick action chip buttons
  window.VCareChat = {
    handleChipClick: function(text) {
      appendUserMessage(text);
      showTypingIndicator();
      setTimeout(() => {
        processUserQuery(text);
      }, 400);
    }
  };

  /* ------------------------------------------------------------------------
     INTENT MATCHING & NLP ENGINE
     ------------------------------------------------------------------------ */
  function processUserQuery(query) {
    const q = query.trim().toLowerCase();

    // 0. FOUNDER / OWNER / MD / CEO / PROPRIETOR Intent
    const founderKeywords = [
      'owner', 'founder', 'parthasarathy', 'who owns', 'who founded', 
      'managing director', 'director', 'proprietor', 'ceo', 'md', 
      'who is the md', 'who is the owner', 'who is the founder', 
      'founder email', 'owner email', 'csp@', 'who is owner', 'who is founder'
    ];
    if (founderKeywords.some(kw => q.includes(kw))) {
      return renderFounderResponse();
    }

    // 1. SPECIFIC PROJECTS & SOLUTIONS MATCHER (Checks specific topic keywords first)
    
    // 1a. CRM / LMS / COLLEGE ERP / ADMISSION SOFTWARE Project
    if (q.includes('crm') || q.includes('lms') || q.includes('college') || q.includes('erp') || q.includes('admission') || q.includes('student') || q.includes('exam') || q.includes('school') || q.includes('university')) {
      return renderCrmLmsProjectResponse();
    }

    // 1b. VIEWSONIC / BOARDROOM AV / PA SYSTEMS Project
    if (q.includes('viewsonic') || q.includes('viewboard') || q.includes('boardroom') || q.includes('pa system') || q.includes('ahuja') || q.includes('auvja') || q.includes('touch panel') || q.includes('flat panel') || q.includes('interactive panel') || q.includes('peoplelink') || q.includes('av integration')) {
      return renderViewSonicAvProjectResponse();
    }

    // 1c. MULTI-BRANCH NETWORKING / FIREWALLS / SOPHOS Project
    if (q.includes('firewall') || q.includes('sophos') || q.includes('switch') || q.includes('router') || q.includes('cabling') || q.includes('lan') || q.includes('vpn') || q.includes('fortinet')) {
      return renderNetworkingProjectResponse();
    }

    // 1d. HARDWARE AMC & SERVER MIGRATION Project
    if (q.includes('amc') || q.includes('asc') || q.includes('maintenance') || q.includes('workstation amc') || q.includes('sla') || q.includes('standby') || q.includes('200+') || q.includes('repair contract')) {
      return renderAmcProjectResponse();
    }

    // 1e. CCTV / SURVEILLANCE / ANPR Project
    if (q.includes('cctv') || q.includes('anpr') || q.includes('camera') || q.includes('hikvision') || q.includes('cp plus') || q.includes('surveillance') || q.includes('dome') || q.includes('bullet') || q.includes('nvr') || q.includes('biometric')) {
      return renderCctvProjectResponse();
    }

    // 1f. WEB HOSTING / DOMAIN / SOFTWARE LICENSING
    if (q.includes('hosting') || q.includes('domain') || q.includes('g suite') || q.includes('workspace') || q.includes('microsoft 365') || q.includes('zoho') || q.includes('tally') || q.includes('autocad')) {
      return renderHostingSoftwareResponse();
    }

    // 1g. DESKTOPS, LAPTOPS & SERVERS
    if (q.includes('laptop') || q.includes('desktop') || q.includes('refurbished') || q.includes('tablet') || q.includes('workstation pc') || q.includes('rack server')) {
      return renderDesktopsLaptopsResponse();
    }

    // 1h. PERIPHERALS, PRINTERS & ASSEMBLED CPUS
    if (q.includes('peripheral') || q.includes('printer') || q.includes('ups') || q.includes('assembled cpu') || q.includes('intel') || q.includes('amd') || q.includes('copier') || q.includes('canon') || q.includes('epson') || q.includes('ricoh') || q.includes('zebra')) {
      return renderPeripheralsPrintersResponse();
    }

    // 2. GENERAL CATEGORIES

    // 2a. GENERAL PROJECTS Intent
    if (q.includes('project') || q.includes('customer') || q.includes('case study') || q.includes('portfolio') || q.includes('client') || q.includes('work done') || q.includes('did for')) {
      return renderGeneralProjectsResponse();
    }

    // 2b. GENERAL PRODUCTS Intent
    if (q.includes('product') || q.includes('sell') || q.includes('catalogue') || q.includes('item') || q.includes('buy')) {
      return renderGeneralProductsResponse();
    }

    // 2c. GENERAL SERVICES Intent
    if (q.includes('service') || q.includes('support') || q.includes('web design') || q.includes('web dev')) {
      return renderGeneralServicesResponse();
    }

    // 3. CONTACT / LOCATION / PHONE / EMAIL Intent
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('email') || q.includes('address') || q.includes('location') || q.includes('nagar') || q.includes('chennai') || q.includes('map') || q.includes('office')) {
      return renderContactResponse();
    }

    // 4. ABOUT COMPANY Intent
    if (q.includes('about') || q.includes('company') || q.includes('vcare') || q.includes('v care') || q.includes('who are you') || q.includes('experience')) {
      return renderAboutResponse();
    }

    // 5. QUOTE / ENQUIRY Intent
    if (q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('enquiry') || q.includes('callback') || q.includes('inquiry')) {
      return renderQuoteFormResponse();
    }

    // 6. GREETING Intent
    if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q.includes('good morning') || q.includes('good afternoon')) {
      return appendBotMessage(`Hello there! How can I assist you with VCare's IT products, hardware maintenance, or customer projects today?`, [
        "🎓 College ERP & CRM Project",
        "📺 ViewSonic Boardroom AV",
        "⚙️ IT AMC Services",
        "📞 Contact Office"
      ]);
    }

    // Fallback response
    return appendBotMessage(`I'd be glad to share details about V Care's solutions and client projects. Select an option below or ask any specific question:`, [
      "🎓 College ERP & CRM Project",
      "📺 ViewSonic Boardroom AV Project",
      "🔒 Networking & Sophos Firewall",
      "⚙️ 200+ Workstation AMC",
      "📹 Campus CCTV & ANPR"
    ]);
  }

  /* Response Renderers - Direct Paragraph Explanations without Web Page Links */
  function renderCrmLmsProjectResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-graduation-cap"></i> College ERP, LMS & Admission CRM Project</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We built and implemented a comprehensive College ERP, Admission CRM, and Learning Management System (LMS) for various higher education colleges and institutions in Tamil Nadu. The project automated online student admissions, digital fee collection with integrated payment gateways, hall ticket generation, exam & grading management, attendance tracking, and student/faculty self-service portals for 10,000+ students, delivering 80% faster processing and 100% paperless administration.
        </p>
      </div>
    `;
    appendBotMessage(content, ["📺 ViewSonic Boardroom AV Project", "⚙️ IT AMC Services", "📞 Contact Office"]);
  }

  function renderViewSonicAvProjectResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-tv"></i> ViewSonic Interactive Boardroom & PA System Integration</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We executed a turnkey boardroom audio/video and commercial PA sound system integration project for a global logistics enterprise. The setup included ViewSonic ViewBoard 4K Interactive Flat Panels with myViewBoard digital whiteboard software, Ahuja commercial PA sound systems, 4K PTZ auto-tracking cameras, beamforming microphone arrays, and touch control panels, enabling one-touch multi-party international video conferencing.
        </p>
      </div>
    `;
    appendBotMessage(content, ["🎓 College ERP & CRM Project", "🔒 Networking & Sophos Firewall", "📞 Contact Office"]);
  }

  function renderNetworkingProjectResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-network-wired"></i> Multi-Branch Networking & Firewall Deployment</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We designed and deployed an end-to-end multi-branch network backbone and cybersecurity infrastructure for a leading financial services firm across 12 branch offices in Chennai and Tamil Nadu. The project featured structured Cat6 LAN/WAN cabling, managed Gigabit Ethernet switches, and Sophos Next-Gen Firewalls with encrypted site-to-site VPN tunnels, achieving 99.99% network uptime and zero-trust perimeter security.
        </p>
      </div>
    `;
    appendBotMessage(content, ["⚙️ 200+ Workstation AMC", "📹 Campus CCTV & ANPR", "📞 Contact Office"]);
  }

  function renderAmcProjectResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-tools"></i> 200+ Workstation AMC & Server Migration Project</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We delivered a comprehensive Annual Maintenance Contract (AMC) for 200+ workstations and completed a server database migration to Dell PowerEdge enterprise servers for a multi-specialty healthcare group. Backed by 20+ resident field engineers, guaranteed 2-hour SLA response, and free standby loaner hardware during repairs, we reduced database query times by 30% with zero hardware downtime.
        </p>
      </div>
    `;
    appendBotMessage(content, ["🔒 Networking & Sophos Firewall", "🎓 College ERP & CRM Project", "📞 Contact Office"]);
  }

  function renderCctvProjectResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-video"></i> Campus CCTV Surveillance & ANPR Tracking Project</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          For a prominent educational institution in Chennai, we deployed a total campus surveillance and physical security infrastructure. The project included 60+ Hikvision and CP Plus HD Dome & Bullet cameras, Automatic Number Plate Recognition (ANPR) vehicle entrance tracking, 45+ enterprise Wi-Fi APs, biometric access control terminals, and centralized high-capacity NVR storage.
        </p>
      </div>
    `;
    appendBotMessage(content, ["📺 ViewSonic Boardroom AV Project", "⚙️ IT AMC Services", "📞 Contact Office"]);
  }

  function renderHostingSoftwareResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-cloud"></i> Web Hosting, Email Migration & Software Licensing</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We provide enterprise domain registration, high-speed Linux/Windows cloud hosting with SSL certificates, corporate G Suite / Microsoft 365 email migration, and authorized software licensing for Tally ERP, Zoho, and AutoCAD. For a major garment exporter, we achieved 100% spam-filtered corporate mail deliverability and sub-second web portal speeds for international buyers.
        </p>
      </div>
    `;
    appendBotMessage(content, ["🎓 College ERP & CRM Project", "⚙️ IT AMC Services", "📞 Contact Office"]);
  }

  function renderDesktopsLaptopsResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-desktop"></i> Desktops, Laptops, Workstations & Rack Servers</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          V Care is an authorized supplier of business laptops, commercial desktop PCs, engineering workstations, and enterprise rack/blade servers from top brands including Lenovo, Acer, HP, Dell, Asus, and Apple. We also supply certified refurbished commercial laptops and desktops with warranty coverage, configured to client specifications for corporate fleets and institutions.
        </p>
      </div>
    `;
    appendBotMessage(content, ["⚙️ 200+ Workstation AMC", "🖨️ Peripherals & Printers", "📞 Contact Office"]);
  }

  function renderPeripheralsPrintersResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-print"></i> Peripherals, Custom Assembled CPUs & Printers</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          We supply genuine computer peripherals (monitors, keyboards, SSDs, GPUs, RAM), custom Intel Core and AMD Ryzen assembled CPUs built to exact specifications, APC and Numeric UPS power backups, and industrial/office printers (Laser, Inktank, Barcode, Thermal, and Ricoh/Canon copiers) backed by ongoing maintenance and consumable supply support.
        </p>
      </div>
    `;
    appendBotMessage(content, ["💻 Desktops & Laptops", "⚙️ IT AMC Services", "📞 Contact Office"]);
  }

  function renderGeneralProjectsResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-project-diagram"></i> Key Completed Client Projects</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          V Care has executed major IT infrastructure projects across Tamil Nadu, including: College ERP, Admission CRM & LMS software for 10,000+ students; 12-branch network and Sophos firewall deployment for financial firms; ViewSonic 4K boardroom AV & Ahuja PA system integrations; 200+ workstation AMC and server migration for healthcare providers; and campus-wide CCTV surveillance with ANPR license plate recognition.
        </p>
      </div>
    `;
    appendBotMessage(content, ["🎓 College ERP & CRM", "📺 ViewSonic Boardroom AV", "🔒 Sophos Firewall Project", "⚙️ 200+ Workstation AMC"]);
  }

  function renderGeneralProductsResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-boxes"></i> Hardware & Software Products Portfolio</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          V Care supplies commercial laptops & desktops (Lenovo, Dell, HP, Acer, Apple), custom-assembled Intel/AMD CPUs, enterprise rack servers, APC/Numeric UPS systems, Canon/Epson/Ricoh printers, Cisco/Aruba network switches, Sophos firewalls, Hikvision/CP Plus CCTV & ANPR cameras, ViewSonic 4K interactive flat panels, and G Suite / Microsoft 365 / Tally / AutoCAD software licenses.
        </p>
      </div>
    `;
    appendBotMessage(content, ["💻 Desktops & Laptops", "📺 ViewSonic Flat Panels", "🖨️ Printers & Peripherals", "🔒 Firewalls & Switches"]);
  }

  function renderGeneralServicesResponse() {
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 1rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.5rem; font-size: 1rem;"><i class="fas fa-tools"></i> IT Services & Maintenance Solutions</h5>
        <p style="font-size: 0.92rem; line-height: 1.6; color: #e2e8f0; margin: 0;">
          V Care provides comprehensive & non-comprehensive Annual Maintenance Contracts (AMC/ASC) with resident technicians, guaranteed 2-hour SLAs, and standby hardware for desktops, servers, networks, and CCTV. We also build custom web applications, CRM/LMS systems, domain & cloud hosting, and turnkey CCTV and boardroom AV room setup.
        </p>
      </div>
    `;
    appendBotMessage(content, ["⚙️ Hardware AMC & ASC", "🎓 CRM & LMS Development", "🌐 Domain & Web Hosting", "📞 Contact Office"]);
  }

  function renderContactResponse() {
    const currentKB = window.VCareKnowledge || {};
    const comp = currentKB.company || {};
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 0.95rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.4rem; font-size: 0.95rem;"><i class="fas fa-map-marker-alt"></i> V Care Corporate Office & Service Center</h5>
        <p style="font-size: 0.9rem; margin-bottom: 0.4rem; color: #ffffff;"><strong>Address:</strong><br>${comp.corporateOffice || 'Old No 11A, New No 27, Mahalakshmi Street, T. Nagar, Chennai - 600017'}</p>
        <p style="font-size: 0.88rem; margin-bottom: 0.4rem; color: #00f0ff;"><strong>Service Location:</strong> T. Nagar, Chennai</p>
        <p style="font-size: 0.88rem; margin-bottom: 0.4rem;"><strong>Phone Lines:</strong><br>
          <a href="tel:+919841098771" style="color:#00f0ff; font-weight:600;">+91 98410 98771</a> / 
          <a href="tel:+919841018733" style="color:#00f0ff; font-weight:600;">+91 98410 18733</a><br>
          Landline: 044 24356354 / 044 24322020
        </p>
        <p style="font-size: 0.88rem; margin-bottom: 0.2rem;"><strong>General Email:</strong> <a href="mailto:${comp.email || 'info@vcaregroups.net'}" style="color:#00f0ff;">${comp.email || 'info@vcaregroups.net'}</a></p>
        <p style="font-size: 0.88rem;"><strong>Founder & MD Email:</strong> <a href="mailto:${comp.founderEmail || 'csp@vcaregroups.net'}" style="color:#00f0ff;">${comp.founderEmail || 'csp@vcaregroups.net'}</a></p>
      </div>
    `;
    appendBotMessage(content, ["👤 Founder & Owner Info", "📦 View Products", "🚀 View Projects"]);
  }

  function renderAboutResponse() {
    const comp = kb.company || {};
    const content = `
      <strong>About V Care Communication (P) Ltd:</strong><br>
      Established in <strong>${comp.founded}</strong> (${comp.experienceYears} experience) by <strong>${comp.founder || 'CS Parthasarathy'}</strong> (Founder & Managing Director).<br><br>
      V Care is a leading System Integration, Networking, and IT Solutions provider headquartered in Chennai. With <strong>${comp.teamSize}</strong>, we deliver enterprise hardware, network firewalls, HD video conferencing, and 24/7 hardware AMC services.
    `;
    appendBotMessage(content, ["👤 Founder & Owner Info", "🚀 Customer Projects We Did", "📦 View Products"]);
  }

  function renderFounderResponse() {
    const currentKB = window.VCareKnowledge || {};
    const comp = currentKB.company || {};
    const founderName = comp.founder || "CS Parthasarathy";
    const founderEmail = comp.founderEmail || "csp@vcaregroups.net";
    const content = `
      <div style="background: rgba(3,7,18,0.7); border: 1px solid rgba(0,240,255,0.4); border-radius: 8px; padding: 0.95rem;">
        <h5 style="color:#00f0ff; margin-bottom: 0.4rem; font-size: 0.95rem;"><i class="fas fa-user-tie"></i> Company Founder & Managing Director</h5>
        <p style="font-size: 1.05rem; font-weight: 700; color: #ffffff; margin-bottom: 0.25rem;">${founderName}</p>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.5rem;">Founder & Managing Director / Owner • Est. 1997</p>
        <p style="font-size: 0.88rem; margin-bottom: 0.5rem;"><strong>Direct Email:</strong> <a href="mailto:${founderEmail}" style="color:#00f0ff; font-weight:600; text-decoration:underline;">${founderEmail}</a></p>
        <p style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.4rem; line-height: 1.4;">Mr. CS Parthasarathy founded V Care Communication in 1997 and has led the company for over 30 years as a premier IT hardware provider and system integrator in Chennai.</p>
      </div>
    `;
    appendBotMessage(content, ["🏢 About Company History", "📦 Explore Products", "📞 Contact Office"]);
  }

  function renderQuoteFormResponse() {
    const content = `
      <strong>Request an AMC / Product Quote:</strong><br>
      Please share your requirements or email us directly at <strong>info@vcaregroups.net</strong> or call <strong>+91 98410 98771</strong> for an instant proposal! You can also fill our quick enquiry form on the website.
    `;
    appendBotMessage(content, ["📞 Call +91 98410 98771", "📦 Browse Products", "🚀 View Projects"]);
  }

  // Initialize DOM when loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbotDOM);
  } else {
    initChatbotDOM();
  }

})();
