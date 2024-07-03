import { createCard, displayCards, fetchDispensers } from './tissueDispenser';
import { db, collection, getDocs } from './firebase';

jest.mock('./firebase');

describe('Firestore connection', () => {
  it('should fetch dispensers from Firestore', async () => {
    const mockData = [
      { id: 'Lt1A01', status: 'HABIS', location: 'Lantai 1 A 02' },
      { id: 'Lt2A01', status: 'TERSEDIA', location: 'Lantai 2 A 01' },
    ];

    const mockSnapshot = {
      forEach: jest.fn(callback => {
        mockData.forEach(doc => callback({ data: () => doc }));
      }),
    };

    getDocs.mockResolvedValue(mockSnapshot);

    await fetchDispensers();

    expect(getDocs).toHaveBeenCalledWith(collection(db, 'tissue_dispensers'));
    expect(mockSnapshot.forEach).toHaveBeenCalled();
  });
});