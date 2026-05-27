import { load } from 'cheerio';
import ofetch from '@/utils/ofetch';

export default async function handler() {
    const url = 'https://www.futures-photography.com';
    const response = await ofetch(url);
    const $ = load(response);

    const items = $('article.post')   // ← CSS selector for each item
        .toArray()
        .map((el) => ({
            title: $(el).find('h2').text().trim(),
            link: $(el).find('a').attr('href'),
            pubDate: $(el).find('time').attr('datetime'),
            description: $(el).find('p.summary').text().trim(),
        }));

    return {
        title: 'My Site — Latest',
        link: url,
        item: items,
    };
}
