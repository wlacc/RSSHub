import { Route } from '@/types';
import handler from './handler';

export const route: Route = {
    path: '/projects',
    name: 'Artist Projects',
    url: 'www.futures-photography.com',
    maintainers: ['yourGitHubUsername'],
    handler,
};
