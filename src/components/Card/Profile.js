"use client";

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

export default function ProfileCard({ member }) {
  const { name, role, bio, image, github, linkedin, email } = member;

  return (
    <div className="bg-[#131C31] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
      {/* Top Image Section */}
      <div className="relative w-full h-72 overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131C31] via-transparent to-transparent opacity-90" />
      </div>

      {/* Content Section */}
      <div className="p-6 pt-2 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-white text-xl font-bold tracking-tight mb-1">
          {name}
        </h3>

        {/* Role */}
        <p className="text-orange-500 font-semibold text-sm mb-3">
          {role}
        </p>

        { bio && (
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
            {bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-4 text-slate-400 mt-auto pt-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label={`${name}'s GitHub`}
            >
              <GithubIcon />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <LinkedinIcon />
            </a>
          )}
          {email && (
            <a
              href={email}
              className="hover:text-orange-500 transition-colors"
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
