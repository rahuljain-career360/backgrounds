import Link from 'next/link';
import styles from './CustomLink.module.css';

interface CustomLinkProps {
  href: string;
  label: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ href, label }) => {
  return (
    <Link href={href} className={styles.linkWrapper}>
      {label}
    </Link>
  );
};