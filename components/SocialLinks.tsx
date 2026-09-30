// Row of social icons. Only networks with a URL set in Admin > Settings are shown.
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon } from "./Icons";

type Props = {
  settings: { instagramUrl: string; facebookUrl: string; twitterUrl: string; youtubeUrl: string };
  className?: string;
};

export default function SocialLinks({ settings, className = "" }: Props) {
  const links = [
    { href: settings.instagramUrl, label: "Instagram", Icon: InstagramIcon },
    { href: settings.facebookUrl, label: "Facebook", Icon: FacebookIcon },
    { href: settings.twitterUrl, label: "X (Twitter)", Icon: XIcon },
    { href: settings.youtubeUrl, label: "YouTube", Icon: YouTubeIcon },
  ].filter((l) => l.href);

  if (!links.length) return null;
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
             className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700">
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
