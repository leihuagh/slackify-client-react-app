import React from 'react';

import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { meQuery } from '../../graphql/queries/queries';

import Sidebar from './Sidebar';
import Header from './Header';
import Messages from './Messages';
import SendMessage from './SendMessage';

const ViewTeam = ({
  data: { loading, me },
  match: { params: { teamId, channelId } },
}) => {
  if (loading) {
    return null;
  }

  const { username, teams } = me;

  // Redirect to create-team page if where not any teams created yet
  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
    : 0;
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

  return (
    <div className="view-team">
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
        username={username}
      />
      {channel && <Header channel={channel} />}
      {channel && <Messages channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </div>
  );
};

export default graphql(meQuery, {
  options: {
    fetchPolicy: 'network-only',
  },
})(ViewTeam);
