import { load } from 'cheerio';
import ofetch from '@/utils/ofetch';

export default async function handler() {
    const baseUrl = 'https://www.futures-photography.com';
    const response = await ofetch(`${baseUrl}/project-index`);
    const $ = load(response);

    const items = $('div.index_item')
        .toArray()
        .map((el) => {
            const link = $(el).find('a.index-project_title').attr('href');
            const title = $(el).find('div.text-size-medium.is-alternate.is-pointer').text().trim();
            const artist = $(el).find('div.text-size-regular.is-artist').text().trim();
            const year = $(el).find('div.text-size-tiny.is-alternate.text-color-grey').first().text().trim();
            const venue = $(el).find('div.text-size-tiny.is-alternate.text-color-grey.is-pointer').text().trim();
            const image = $(el).find('img.image-list').attr('src');

            return {
                title: `${title} — ${artist}`,
                link: link ? `${baseUrl}${link}` : baseUrl,
                description: `
                    ${image ? `<img src="${image}" /><br/>` : ''}
                    <strong>${artist}</strong><br/>
                    ${venue ? `${venue}<br/>` : ''}
                    ${year ? `${year}` : ''}
                `,
            };
        })
        .filter((item) => item.title.trim() !== '—');

    return {
        title: 'Futures Photography — Artist Projects',
        link: `${baseUrl}/project-index`,
        item: items,
    };
}
