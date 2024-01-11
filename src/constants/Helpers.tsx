// utils.ts
import { User } from '../constants/Api';
import { TeamMemberModel } from '../components/TeamMemberItem';

export const ConvertUsersToTeamMembers = (users: User[]): TeamMemberModel[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    lat: user.address.geo.lat,
    lng: user.address.geo.lng,
  }));
};


export const ConvertUserToTeamMember = (user: User): TeamMemberModel => {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      lat: user.address.geo.lat,
      lng: user.address.geo.lng,
    };
  };
