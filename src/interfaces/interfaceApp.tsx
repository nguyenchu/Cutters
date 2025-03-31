interface Salon {
    id: number;
    name: string;
    address: string;
    postalCode?: string;
    postalPlace?: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    country?: string;
    visibleInMap?: boolean;
}