import { setSuites } from '..';
import throwError from '../../../lib/throwError';
import { setCanceled } from '../../test/lib/canceled';
import getSuiteState from '../getSuiteState';

/**
 * Cleans up a suite from state.
 * @param {string} suiteId
 */
const remove = suiteId => {
  if (!suiteId) {
    throwError('`vest.remove` must be called with suiteId.');
  }

  const suite = getSuiteState(suiteId);
  if (!suite) {
    return;
  }

  setCanceled(...(suite.pending || []));
  setCanceled(...(suite.lagging || []));

  setSuites(state => {
    delete state[suiteId];
    return state;
  });
};

export default remove;
