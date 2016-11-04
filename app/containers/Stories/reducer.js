import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS([
  {
    id: 1,
    title: 'MVP project',
    topic: 'MKS-detail',
    text: 'I just spent a huge amount of time working on the \'Minimum Viable Product\' project. It\'s the first project ' +
    'we have worked on alone, and we had less than 24 hours to put together \'something that works\'.\n\nI decided to ' +
    'focus on a contacts reminder app that I\'ve been thinking about for the past few months. ...',
  },
  {
    id: 4,
    title: 'Started MKS',
    topic: 'MKS-general',
    text: 'Starting MKS has been a blast so far. I can\'t believe I\'m almost half-way done.',
  },
  {
    id: 2,
    title: 'Got cats',
    topic: 'Miscellaneous',
    text: 'We got a couple of really cute cats back in November. We named them Ari and Colvin. I\'m sorry, but even if ' +
    'you have cats, ours are better.',
  },
  {
    id: 3,
    title: 'Married!',
    topic: 'Miscellaneous',
    text: 'We got MARRIED! OK, I\'m excited, but things are pretty much the same as they were before.\n\nThe only change' +
    ' is that I\'m at MakerSquare the whole time, so Elyse keeps joking to people that all the myths are correct, and' +
    ' she never sees me now that we\'re married.',
  },
  {
    id: 5,
    title: 'Angular rocks',
    topic: 'MKS-detail',
    text: 'Angular rocks! Yes, it really does! This explains a lot: https://gfycat.com/JovialSimilarAnchovy',
  },
  {
    id: 6,
    title: 'Writing a blog',
    topic: 'MKS-general',
    text: 'If you\'re curious about my progress at MakerSquare, check out my blog here: http://bithabit.tumblr.com',
  },
]);

export default function storiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
