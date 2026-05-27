import { Route } from '@/types';
import handler from './handler';

export const route: Route = {
    path: '/latest',
    name: 'Artist projects',
    url: 'www.futures-photography.com',
    maintainers: ['wlacc'],
    handler,
};
