import { useTheme } from 'next-themes';
import Image from 'next/image';

type profileImageProps = {
  imageURI: string | null | undefined;
  username: string | null | undefined;
};

export default function ProfileImage({
  imageURI,
  username,
}: profileImageProps) {
  const { systemTheme } = useTheme();
  const defaultProfile =
    systemTheme === 'light'
      ? '/light_default_profile.svg'
      : '/dark_default_profile.svg';

  return (
    <Image
      src={imageURI ?? defaultProfile}
      width={54}
      height={54}
      className="!m-0 rounded-full"
      alt={`${username ?? 'Someone'}'s profile picture`}
    />
  );
}
