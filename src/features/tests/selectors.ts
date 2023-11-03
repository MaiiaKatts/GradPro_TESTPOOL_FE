import { RootState } from '../../app/store';
import Test from './types/Test';

export const selectTests = (state: RootState): Test[] => state.tests.tests;
export const selectError = (state: RootState): string | undefined => state.tests.error;
