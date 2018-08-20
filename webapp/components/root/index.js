/*
Copyright 2018 Blindside Networks

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const {connect} = window.ReactRedux;
const {bindActionCreators} = window.Redux;
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {getLastPostPerChannel} from 'mattermost-redux/selectors/entities/posts';

import {getSortedDirectChannelWithUnreadsIds} from 'mattermost-redux/selectors/entities/channels';
import {getJoinURL} from '../../actions';

import Root from './root.jsx';

//Root component is used for creating a popup notifying user about a
// BigBlueButton meeting started from a direct message

function mapStateToProps(state, ownProps) {
  const post = ownProps.post || {};
  /* Provide values for any custom props or override any existing props here */
  let team = getCurrentTeam(state) || {};
  let teamname = team.name;
  let cur_user = getCurrentUser(state) || {};
  const keepChannelIdAsUnread = state.views.channel.keepChannelIdAsUnread;
  return {
    cur_user,
    teamname,
    state,
    lastpostperchannel: getLastPostPerChannel(state),
    unreadChannelIds: getSortedDirectChannelWithUnreadsIds(state, keepChannelIdAsUnread),
    ...ownProps
  };
}

function mapDispatchToProps(dispatch) {
  /* Provide actions here if needed */
  return {
    actions: bindActionCreators({
      getJoinURL
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
