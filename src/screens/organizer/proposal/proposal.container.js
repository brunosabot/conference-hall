import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import get from 'lodash/get'

import loader from 'components/loader'
import Proposal from './proposal'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const proposalId = router.getParam('proposalId')
  const proposal = store.data.proposals.get(proposalId)
  const event = store.data.events.get(eventId)
  const settings = store.data.eventsSettings.get(eventId)

  return {
    loaded: !!proposal && !!event,
    proposal,
    eventId,
    deliberationActive: get(settings, 'deliberation.enabled'),
    load: () => {
      store.dispatch('@@ui/ON_LOAD_PROPOSAL')
      store.dispatch('@@ui/ON_LOAD_EVENT')
    },
  }
}

export default compose(
  forRoute.absolute('organizer-event-proposal-page'), //
  inject(mapStore), //
  loader, //
)(Proposal)
