import { siteContent } from "./content.js";

const sectionLinkMap = new Map();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function isFilled(value) {
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

function byId(id) {
  return document.getElementById(id);
}

function buildLink({ label, href, kind = "secondary" }) {
  if (!isFilled(label) || !isFilled(href)) {
    return "";
  }

  const opensNewTab = /^https?:/i.test(href);
  const rel = opensNewTab ? ' rel="noreferrer"' : "";
  const target = opensNewTab ? ' target="_blank"' : "";
  const buttonClass = kind === "primary" ? "button button-primary" : "button button-secondary";

  return `<a class="${buttonClass}" href="${escapeHtml(href)}"${target}${rel}>${escapeHtml(label)}</a>`;
}

function normalizeHref(type, value) {
  if (!isFilled(value)) {
    return "";
  }

  if (type === "email" && !value.startsWith("mailto:")) {
    return `mailto:${value}`;
  }

  return value;
}

function updateSeo() {
  const { seo } = siteContent;
  const title = seo.title || document.title;
  const description = seo.description || "";
  const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(", ") : "";

  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="keywords"]')?.setAttribute("content", keywords);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);

  if (isFilled(seo.siteUrl)) {
    let ogUrl = document.querySelector('meta[property="og:url"]');

    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }

    ogUrl.setAttribute("content", seo.siteUrl);
  }
}

function updateBranding() {
  const mark = siteContent.hero.name.trim().charAt(0) || "P";
  const brandName = siteContent.hero.name || "Portfolio";

  document.querySelector("[data-brand-mark]")?.replaceChildren(mark);
  document.querySelector("[data-brand-name]")?.replaceChildren(brandName);
  document.querySelector("[data-footer-name]")?.replaceChildren(brandName);
}

function renderHero() {
  const heroRoot = byId("hero-content");
  const glanceRoot = byId("hero-glance");
  const featuredProjects = siteContent.projects.filter((project) => project.featured);
  const metaBits = [siteContent.hero.location, siteContent.hero.status].filter(isFilled);
  const buttons = siteContent.hero.ctas
    .map((cta) => buildLink(cta))
    .filter(Boolean)
    .join("");
  const glanceItems = [
    ["현재 상태", siteContent.hero.status],
    ["경력 포지션", `${siteContent.experience.length}개`],
    ["대표 프로젝트", `${featuredProjects.length}개`],
    ["기술 카테고리", `${siteContent.skills.length}개`],
  ]
    .filter(([, value]) => isFilled(value))
    .map(
      ([label, value]) => `
        <li class="glance-item">
          <span class="glance-label">${escapeHtml(label)}</span>
          <span class="glance-value">${escapeHtml(value)}</span>
        </li>
      `,
    )
    .join("");

  heroRoot.innerHTML = `
    <p class="eyebrow">Frontend Portfolio</p>
    <h1>${escapeHtml(siteContent.hero.name)}</h1>
    <p class="hero-role">${escapeHtml(siteContent.hero.role)}</p>
    <p class="hero-summary">${escapeHtml(siteContent.hero.oneLiner)}</p>
    <div class="hero-meta">
      ${metaBits.map((item) => `<span class="meta-pill">${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="hero-cta-group">${buttons}</div>
  `;

  glanceRoot.innerHTML = `
    <div>
      <h2 class="panel-title">Quick Snapshot</h2>
      <p class="panel-copy">
        채용 담당자가 빠르게 훑을 수 있도록 경력과 프로젝트 규모를 한눈에 정리했습니다.
      </p>
    </div>
    <ul class="glance-list">${glanceItems}</ul>
  `;
}

function renderAbout() {
  const aboutRoot = byId("about-content");
  const paragraphs = siteContent.about.paragraphs
    .filter(isFilled)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const strengths = siteContent.about.strengths
    .filter(isFilled)
    .map(
      (strength, index) => `
        <li class="strength-card">
          <span class="strength-index">${String(index + 1).padStart(2, "0")}</span>
          <p>${escapeHtml(strength)}</p>
        </li>
      `,
    )
    .join("");

  aboutRoot.innerHTML = `
    <div class="about-column">
      <div class="about-copy">${paragraphs}</div>
    </div>
    <div class="strength-grid">
      ${strengths}
    </div>
  `;
}

function renderExperience() {
  const experienceRoot = byId("experience-content");
  const cards = siteContent.experience
    .map(({ company, role, period, summary, bullets }) => {
      const bulletItems = bullets
        .filter(isFilled)
        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
        .join("");

      return `
        <article class="experience-card">
          <div class="card-topline">
            <h3 class="card-title">${escapeHtml(company)}</h3>
            <span class="card-period">${escapeHtml(period)}</span>
          </div>
          <p class="card-role">${escapeHtml(role)}</p>
          <p class="experience-summary">${escapeHtml(summary)}</p>
          <ul class="bullet-list">${bulletItems}</ul>
        </article>
      `;
    })
    .join("");

  experienceRoot.innerHTML = cards;
}

function renderSkills() {
  const skillsRoot = byId("skills-content");
  const cards = siteContent.skills
    .map(({ category, items }) => {
      const tags = items
        .filter(isFilled)
        .map((item) => `<li class="skill-item">${escapeHtml(item)}</li>`)
        .join("");

      return `
        <article class="skills-card">
          <h3>${escapeHtml(category)}</h3>
          <ul class="skills-list">${tags}</ul>
        </article>
      `;
    })
    .join("");

  skillsRoot.innerHTML = cards;
}

function renderProjects() {
  const projectsRoot = byId("projects-content");
  const cards = siteContent.projects
    .filter((project) => project.featured)
    .map(({ name, period, summary, problem, solution, impact, stack, links }) => {
      const stackItems = stack
        .filter(isFilled)
        .map((item) => `<li class="tag">${escapeHtml(item)}</li>`)
        .join("");
      const projectLinks = links
        .map((link) => buildLink({ ...link, kind: "secondary" }))
        .filter(Boolean)
        .join("");

      return `
        <article class="project-card">
          <div class="card-topline">
            <h3 class="card-title">${escapeHtml(name)}</h3>
            <span class="card-period">${escapeHtml(period)}</span>
          </div>
          <p class="project-summary">${escapeHtml(summary)}</p>
          <div class="project-brief">
            <div class="brief-block">
              <span class="brief-label">Problem</span>
              <p>${escapeHtml(problem)}</p>
            </div>
            <div class="brief-block">
              <span class="brief-label">Solution</span>
              <p>${escapeHtml(solution)}</p>
            </div>
            <div class="brief-block">
              <span class="brief-label">Impact</span>
              <p>${escapeHtml(impact)}</p>
            </div>
          </div>
          <ul class="stack-list">${stackItems}</ul>
          <div class="project-links">${projectLinks}</div>
        </article>
      `;
    })
    .join("");

  projectsRoot.innerHTML =
    cards ||
    `
      <article class="section-placeholder">
        아직 표시할 대표 프로젝트가 없습니다.
      </article>
    `;
}

function renderContact() {
  const contactRoot = byId("contact-content");
  const contact = siteContent.contact;
  const contactEntries = [
    { label: "Email", type: "email", value: contact.email, note: "가장 빠른 답변 채널" },
    { label: "GitHub", type: "github", value: contact.github, note: "코드와 활동 기록" },
    { label: "LinkedIn", type: "linkedin", value: contact.linkedin, note: "경력 네트워크" },
  ].filter((entry) => isFilled(entry.value));

  const contactItems = contactEntries
    .map(({ label, type, value, note }) => {
      const href = normalizeHref(type, value);
      const safeValue = escapeHtml(value);
      const isExternal = type !== "email";
      const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";

      return `
        <li class="contact-item">
          <span class="contact-label">${escapeHtml(label)}</span>
          <a class="contact-value" href="${escapeHtml(href)}"${target}>${safeValue}</a>
          <span class="contact-note">${escapeHtml(note)}</span>
        </li>
      `;
    })
    .join("");
  const resumeLink = isFilled(contact.resume)
    ? buildLink({ label: "이력서 보기", href: contact.resume, kind: "primary" })
    : "";
  const emptyMessage = contactItems
    ? ""
    : '<p class="contact-copy">연락처 정보가 아직 등록되지 않았습니다. `content.js`에서 값을 추가하면 바로 반영됩니다.</p>';

  contactRoot.innerHTML = `
    <div class="contact-shell-inner">
      <div>
        <p class="panel-title">함께 이야기해 보고 싶은 주제가 있다면 연락 주세요.</p>
        <p class="contact-copy">
          제품 구조를 함께 다듬는 프론트엔드 역할, 협업이 많은 팀 환경, 운영 이후 개선 사이클이 중요한 문제를 선호합니다.
        </p>
        <div class="contact-actions">
          ${buildLink({ label: "이메일 보내기", href: normalizeHref("email", contact.email), kind: "secondary" })}
          ${resumeLink}
        </div>
      </div>
      <div>
        <ul class="contact-list">${contactItems}</ul>
        ${emptyMessage}
      </div>
    </div>
  `;
}

function updateFooter() {
  const year = new Date().getFullYear();
  const updatedLabel = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(document.lastModified));
  const footer = document.querySelector("[data-last-updated]");

  if (footer) {
    footer.textContent = `${year} Portfolio. 마지막 업데이트 ${updatedLabel}`;
  }
}

function activateNavLink(id) {
  sectionLinkMap.forEach((link, key) => {
    if (key === id) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setupNavigationState() {
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href")?.slice(1);

    if (targetId) {
      sectionLinkMap.set(targetId, link);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

      if (visibleEntry?.target.id) {
        activateNavLink(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0.2, 0.4, 0.6],
    },
  );

  document.querySelectorAll("#top, .observed-section").forEach((section) => {
    observer.observe(section);
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

function init() {
  document.body.classList.remove("no-js");
  document.body.classList.add("is-ready");
  updateSeo();
  updateBranding();
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderContact();
  updateFooter();
  setupNavigationState();
  setupRevealObserver();
}

init();
