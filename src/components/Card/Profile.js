"use client";

import { useTheme } from "@/context/ThemeContext";

function GithubIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ProfileCard({ member, index = 0 }) {
  const { name, role, bio, image, github, instagram, x, linkedin, email } = member;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 150}
      className={`border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group hover:-translate-y-1 ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-none hover:border-orange-500/50'
          : 'bg-[#131C31] border-slate-800/80 text-white shadow-xl hover:border-orange-500/50 hover:shadow-orange-500/10'
      }`}
    >
      {/* Top Image Section - Clean without gradient overlay */}
      <div className={`relative w-full h-64 sm:h-72 overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-900'}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 pt-5 flex flex-col flex-1">
        {/* Name */}
        <h3 className={`text-xl font-bold tracking-tight mb-1 transition-colors ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          {name}
        </h3>

        {/* Role */}
        <p className="text-[#FF5722] font-semibold text-sm mb-3">
          {role}
        </p>

        {bio && (
          <p className={`text-sm leading-relaxed mb-6 flex-1 transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {bio}
          </p>
        )}

        {/* Social Links including GitHub, Instagram (IG), X (Twitter), LinkedIn, Email */}
        <div className={`flex flex-wrap items-center gap-3.5 mt-auto pt-2 transition-colors ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5722] transition-colors"
              aria-label={`${name}'s GitHub`}
            >
              <GithubIcon />
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5722] transition-colors"
              aria-label={`${name}'s Instagram`}
            >
              <InstagramIcon />
            </a>
          )}
          {x && (
            <a
              href={x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5722] transition-colors"
              aria-label={`${name}'s X (Twitter)`}
            >
              <XIcon />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5722] transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <LinkedinIcon />
            </a>
          )}
          {email && (
            <a
              href={email}
              className="hover:text-[#FF5722] transition-colors"
              aria-label={`Email ${name}`}
            >
              <MailIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
