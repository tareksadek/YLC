import React from 'react'
import PropTypes from 'prop-types'

import FullScreenDialog from '../../layout/FullScreenDialog'
import Report from '../Analytics/Report'

import { useLanguage } from '../../hooks/useLang'

const TeamMemberAnalytics = ({
  open, onClose, memberName, memberAnalytics, tags,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam

  return (
    <>
      {memberAnalytics && (
        <FullScreenDialog
          open={open}
          onClose={onClose}
          title={`${memberName} ${pageStatics.data.titles.memberAnalyticsDialog}`}
          loading={false}
        >
          {/* <Report
            clickedNo={memberAnalytics.clickedNo || 0}
            connections={memberAnalytics.connections || null}
            connectionsNo={memberAnalytics.connectionsTotal}
            visits={memberAnalytics.visits || 0}
            onMenuItemClicked={() => true}
            links={memberAnalytics.masterLinks}
            tags={tags}
            socialLinksOrder={memberAnalytics.socialLinksOrder}
            teamAnalytics={memberAnalytics.isTeamReport}
            teamMemberAnalytics
            teamMemberId={memberAnalytics.userId}
            withoutMenus
          /> */}
          <Report
            visits={memberAnalytics.visitsArray}
            visitsCount={memberAnalytics.visits}
            loadingVisits={!memberAnalytics}
            loadingVisitsDone={!!memberAnalytics}
            clickedNo={memberAnalytics.clickedNo || 0}
            connectionsNo={memberAnalytics.uniqueConnectionsCount || 0}
            connections={null}
            // onMenuItemClicked={handleMenuButtons}
            links={memberAnalytics.masterLinks && memberAnalytics.masterLinks.length > 0 ? memberAnalytics.masterLinks : null}
            tags={tags}
            socialLinksOrder={memberAnalytics.socialLinksOrder && memberAnalytics.socialLinksOrder.length > 0 ? memberAnalytics.socialLinksOrder : null}
          />
        </FullScreenDialog>
      )}
    </>
  )
}

TeamMemberAnalytics.defaultProps = {
  open: false,
  memberName: null,
  memberAnalytics: null,
  tags: null,
}

TeamMemberAnalytics.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  memberName: PropTypes.string,
  memberAnalytics: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default TeamMemberAnalytics
