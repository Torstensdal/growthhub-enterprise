import type { AppState } from '../types';

interface ScreenProps {
  state: AppState;
}

export const Screen = ({ state }: ScreenProps) => {
  return (
    <div className='flex-1 p-6 text-white'>
      <h1 className='text-2xl font-bold capitalize'>{String(state)}</h1>
      <p>Content for {String(state)} screen goes here.</p>
    </div>
  );
};
