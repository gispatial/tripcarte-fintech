import { random, lorem } from 'faker/locale/en';

import { randomFloat, weightedBoolean } from './utils';

const productReferences = {
    animals: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    beard: [
        'Sabah',
        'Sarawak',
        'Pulau Mari Mari',
    ],
    business: [
        'Thailand',
        'India',
        'Singapore',
    ],
    cars: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    city: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    flowers: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    food: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    nature: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    people: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    sports: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    tech: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    travel: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
    water: [
        'Langkawi',
        'Melaka',
        'Pulau-Pinang',
        'Perak',
        'Johor',
        'Pahang',
        'Terengganu',
        'Genting Highlands',
        'Port Dickson',
        'Kuala Lumpur',
    ],
};

export default db => {
    let id = 0;

    return db.categories.reduce(
        (acc, category) => [
            ...acc,
            ...Array.from(Array(10).keys()).map(index => {
                const width = randomFloat(10, 40);
                const height = randomFloat(10, 40);

                return {
                    id: id++,
                    category_id: category.id,
                    reference: productReferences[category.name][index],
                    width: width,
                    height: height,
                    price: randomFloat(
                        (width * height) / 20,
                        (width * height) / 15
                    ),
                    thumbnail:
                        'https://marmelab.com/posters/' +
                        category.name +
                        '-' +
                        (index + 1) +
                        '.jpeg',
                    image:
                        'https://marmelab.com/posters/' +
                        category.name +
                        '-' +
                        (index + 1) +
                        '.jpeg',
                    description: lorem.paragraph(),
                    stock: weightedBoolean(10)
                        ? 0
                        : random.number({ min: 0, max: 150 }),
                    sales: 0,
                };
            }),
        ],
        []
    );
};
