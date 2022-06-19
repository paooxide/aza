import { UserProfilePublicDto } from '../dto/user-profile-public.dto';

export const mapUserPublicProfile = ({
  _id,
  firstName,
  lastName,
  email,
  username,
  bio,
  profilePic,
  tags,
  locale,
  followers,
  followings,
  type,
  birthday,
  gender,
  pronouns,
  referredBy,
}: UserProfilePublicDto) => {
  return {
    _id,
    firstName,
    lastName,
    email,
    username,
    bio,
    profilePic,
    tags,
    locale,
    followers,
    followings,
    type,
    birthday,
    gender,
    pronouns,
    referredBy,
  };
};
