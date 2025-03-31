import fetchMock from "jest-fetch-mock";

const fetchSalons = async () => {
    try {
        const response = await fetch('https://api.test.cutters.no/v2/salons');
        const data = await response.json();
        return data.map((salon: Salon) => ({
            id: salon.id,
            name: salon.name,
            latitude: Number(salon.coordinates.latitude),
            longitude: Number(salon.coordinates.longitude),
        }));
    } catch(error) {
        return [];
    }
};

beforeEach(() => {
    fetchMock.resetMocks();
});

test('fetchSalons returns salons data', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify([
            {
                id: 1,
                name: 'Cutters Metro',
                coordinates: {
                latitude: 59.927303,
                longitude: 10.956939,
                // 59.927303, 10.956939
                },
            },
        ])
    ); 

    const salons = await fetchSalons();
    expect(salons).toEqual([
        {
            id: 1,
            name: 'Cutters Metro',
            latitude: 59.927303,
            longitude: 10.956939,
        },
    ]);
});

test('fetchSalons handles API failure', async () => {
    fetchMock.mockReject(new Error('API Error'));

    const salons = await fetchSalons();
    expect(salons).toEqual([]);
});