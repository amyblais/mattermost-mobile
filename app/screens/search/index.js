// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {markChannelAsRead, markChannelAsViewed} from 'mattermost-redux/actions/channels';
import {selectPost} from 'mattermost-redux/actions/posts';
import {clearSearch, removeSearchTerms, searchPosts} from 'mattermost-redux/actions/search';
import {getCurrentChannelId} from 'mattermost-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {
    handleSelectChannel,
    loadThreadIfNecessary,
    setChannelDisplayName,
    setChannelLoading
} from 'app/actions/views/channel';
import {handleSearchDraftChanged} from 'app/actions/views/search';

import Search from './search';

function mapStateToProps(state) {
    const currentTeamId = getCurrentTeamId(state);
    const currentChannelId = getCurrentChannelId(state);
    const {recent} = state.entities.search;
    const {searchPosts: searchRequest} = state.requests.search;

    return {
        currentTeamId,
        currentChannelId,
        postIds: state.entities.search.results,
        recent: recent[currentTeamId],
        searchingStatus: searchRequest.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearSearch,
            handleSearchDraftChanged,
            handleSelectChannel,
            loadThreadIfNecessary,
            markChannelAsRead,
            markChannelAsViewed,
            removeSearchTerms,
            searchPosts,
            selectPost,
            setChannelDisplayName,
            setChannelLoading
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
