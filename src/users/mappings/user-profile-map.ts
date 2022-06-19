import { UserProfileDto } from '../dto/user-profile.dto';

export const mapUserPrivateProfile = ({
  _id,
  firstName,
  lastName,
  email,
  username,
  bio,
  profilePic,
  tags,
  locale,
  userActiveStatus,
  type,
  privilege,
  birthday,
  gender,
  pronouns,
  createdAt,
}: UserProfileDto) => {
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
    userActiveStatus,
    type,
    privilege,
    birthday,
    gender,
    pronouns,
    createdAt,
  };
};
