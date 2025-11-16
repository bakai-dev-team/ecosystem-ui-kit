import executedAnim from './executed.json';
import processAnim from './process.json';
import draftAnim from './draft.json';
import rejectedAnim from './rejected.json';

export const animations = {
  success: executedAnim,
  in_progress: processAnim,
  confirm_payment: draftAnim,
  error: rejectedAnim,
};